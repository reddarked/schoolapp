"use client"

import { useState } from "react"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Plus,
  Check,
  X,
  AlertCircle,
  Filter
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Reservation {
  id: number
  employeeName: string
  department: string
  date: Date
  time: string
  guests: number
  meal: string
  status: "confirmed" | "pending" | "cancelled"
  notes?: string
}

const initialReservations: Reservation[] = [
  { id: 1, employeeName: "Carlos Pérez", department: "IT", date: new Date(), time: "12:30", guests: 1, meal: "Menú Ejecutivo", status: "confirmed" },
  { id: 2, employeeName: "María García", department: "RRHH", date: new Date(), time: "12:45", guests: 2, meal: "Ensalada Premium", status: "confirmed" },
  { id: 3, employeeName: "Juan López", department: "Finanzas", date: new Date(), time: "13:00", guests: 1, meal: "Menú Vegetariano", status: "pending" },
  { id: 4, employeeName: "Ana Martínez", department: "Marketing", date: new Date(), time: "13:15", guests: 3, meal: "Menú Ejecutivo", status: "pending", notes: "Reunión con cliente" },
  { id: 5, employeeName: "Pedro Rodríguez", department: "Operaciones", date: new Date(), time: "13:30", guests: 1, meal: "Menú Light", status: "cancelled" },
  { id: 6, employeeName: "Laura Sánchez", department: "IT", date: new Date(Date.now() + 86400000), time: "12:00", guests: 4, meal: "Menú Ejecutivo", status: "pending", notes: "Almuerzo de equipo" },
  { id: 7, employeeName: "Diego Fernández", department: "Ventas", date: new Date(Date.now() + 86400000), time: "12:30", guests: 2, meal: "Pasta Alfredo", status: "confirmed" },
]

const timeSlots = ["11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30"]
const mealOptions = ["Menú Ejecutivo", "Menú Vegetariano", "Menú Light", "Ensalada Premium", "Pasta Alfredo"]

export function ReservationsSection() {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newReservation, setNewReservation] = useState({
    employeeName: "",
    department: "",
    time: "",
    guests: "1",
    meal: "",
    notes: "",
  })

  const filteredReservations = reservations.filter(res => {
    const matchesDate = selectedDate 
      ? res.date.toDateString() === selectedDate.toDateString()
      : true
    const matchesStatus = filterStatus === "all" || res.status === filterStatus
    return matchesDate && matchesStatus
  })

  const updateStatus = (id: number, status: "confirmed" | "pending" | "cancelled") => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status } : res
    ))
  }

  const addReservation = () => {
    if (newReservation.employeeName && newReservation.time && newReservation.meal && selectedDate) {
      const newRes: Reservation = {
        id: Math.max(...reservations.map(r => r.id)) + 1,
        employeeName: newReservation.employeeName,
        department: newReservation.department || "General",
        date: selectedDate,
        time: newReservation.time,
        guests: parseInt(newReservation.guests),
        meal: newReservation.meal,
        status: "pending",
        notes: newReservation.notes || undefined,
      }
      setReservations([...reservations, newRes])
      setNewReservation({ employeeName: "", department: "", time: "", guests: "1", meal: "", notes: "" })
      setIsAddDialogOpen(false)
    }
  }

  const stats = {
    total: filteredReservations.length,
    confirmed: filteredReservations.filter(r => r.status === "confirmed").length,
    pending: filteredReservations.filter(r => r.status === "pending").length,
    totalGuests: filteredReservations.reduce((sum, r) => sum + r.guests, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-primary/20 text-primary"
      case "pending": return "bg-accent/20 text-accent"
      case "cancelled": return "bg-destructive/20 text-destructive"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed": return "Confirmada"
      case "pending": return "Pendiente"
      case "cancelled": return "Cancelada"
      default: return status
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reservaciones</h1>
          <p className="text-muted-foreground mt-1">Gestiona las reservaciones del comedor</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-5 h-5 mr-2" />
              Nueva Reservación
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Crear Nueva Reservación</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nombre del Empleado</Label>
                <Input 
                  placeholder="Ej: Juan Pérez"
                  value={newReservation.employeeName}
                  onChange={(e) => setNewReservation({...newReservation, employeeName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Departamento</Label>
                <Input 
                  placeholder="Ej: IT"
                  value={newReservation.department}
                  onChange={(e) => setNewReservation({...newReservation, department: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hora</Label>
                  <Select 
                    value={newReservation.time}
                    onValueChange={(value) => setNewReservation({...newReservation, time: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Personas</Label>
                  <Input 
                    type="number"
                    min="1"
                    max="10"
                    value={newReservation.guests}
                    onChange={(e) => setNewReservation({...newReservation, guests: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Menú</Label>
                <Select 
                  value={newReservation.meal}
                  onValueChange={(value) => setNewReservation({...newReservation, meal: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona menú" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealOptions.map(meal => (
                      <SelectItem key={meal} value={meal}>{meal}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notas (opcional)</Label>
                <Input 
                  placeholder="Ej: Reunión de trabajo"
                  value={newReservation.notes}
                  onChange={(e) => setNewReservation({...newReservation, notes: e.target.value})}
                />
              </div>
              <Button onClick={addReservation} className="w-full">
                Crear Reservación
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Reservaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-chart-3/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.confirmed}</p>
                <p className="text-sm text-muted-foreground">Confirmadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-chart-4/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalGuests}</p>
                <p className="text-sm text-muted-foreground">Comensales</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              Calendario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md"
            />
          </CardContent>
        </Card>

        {/* Reservations List */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Reservaciones {selectedDate && `- ${selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}`}
              </CardTitle>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="confirmed">Confirmadas</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="cancelled">Canceladas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReservations.length > 0 ? (
                filteredReservations.map(reservation => (
                  <div 
                    key={reservation.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-semibold text-primary">
                          {reservation.employeeName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{reservation.employeeName}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {reservation.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {reservation.guests} {reservation.guests === 1 ? 'persona' : 'personas'}
                          </span>
                          <span>{reservation.meal}</span>
                        </div>
                        {reservation.notes && (
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            {reservation.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(reservation.status)}>
                        {getStatusText(reservation.status)}
                      </Badge>
                      {reservation.status === "pending" && (
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="text-primary hover:text-primary hover:bg-primary/20"
                            onClick={() => updateStatus(reservation.id, "confirmed")}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="text-destructive hover:text-destructive hover:bg-destructive/20"
                            onClick={() => updateStatus(reservation.id, "cancelled")}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-semibold text-muted-foreground">No hay reservaciones</h3>
                  <p className="text-muted-foreground mt-2">
                    No hay reservaciones para esta fecha
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
