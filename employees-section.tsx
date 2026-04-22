"use client"

import { useState } from "react"
import { 
  Search, 
  Plus, 
  MoreHorizontal,
  Building2,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Check,
  X
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Employee {
  id: number
  name: string
  email: string
  phone: string
  department: string
  badge: string
  status: "active" | "inactive"
  balance: number
  mealsThisMonth: number
  joinDate: string
}

const initialEmployees: Employee[] = [
  { id: 1, name: "Carlos Pérez", email: "carlos@empresa.com", phone: "809-555-0101", department: "IT", badge: "EMP001", status: "active", balance: 45.50, mealsThisMonth: 18, joinDate: "2023-01-15" },
  { id: 2, name: "María García", email: "maria@empresa.com", phone: "809-555-0102", department: "RRHH", badge: "EMP002", status: "active", balance: 32.00, mealsThisMonth: 22, joinDate: "2022-06-20" },
  { id: 3, name: "Juan López", email: "juan@empresa.com", phone: "809-555-0103", department: "Finanzas", badge: "EMP003", status: "active", balance: 0.00, mealsThisMonth: 15, joinDate: "2023-03-10" },
  { id: 4, name: "Ana Martínez", email: "ana@empresa.com", phone: "809-555-0104", department: "Marketing", badge: "EMP004", status: "inactive", balance: 12.75, mealsThisMonth: 5, joinDate: "2021-11-05" },
  { id: 5, name: "Pedro Rodríguez", email: "pedro@empresa.com", phone: "809-555-0105", department: "Operaciones", badge: "EMP005", status: "active", balance: 67.25, mealsThisMonth: 20, joinDate: "2022-08-12" },
  { id: 6, name: "Laura Sánchez", email: "laura@empresa.com", phone: "809-555-0106", department: "IT", badge: "EMP006", status: "active", balance: 28.50, mealsThisMonth: 16, joinDate: "2023-02-28" },
  { id: 7, name: "Diego Fernández", email: "diego@empresa.com", phone: "809-555-0107", department: "Ventas", badge: "EMP007", status: "active", balance: 55.00, mealsThisMonth: 19, joinDate: "2022-04-15" },
  { id: 8, name: "Sofía Torres", email: "sofia@empresa.com", phone: "809-555-0108", department: "Legal", badge: "EMP008", status: "inactive", balance: 8.25, mealsThisMonth: 3, joinDate: "2021-09-01" },
]

const departments = ["IT", "RRHH", "Finanzas", "Marketing", "Operaciones", "Ventas", "Legal"]

export function EmployeesSection() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDept, setFilterDept] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  })

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.badge.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = filterDept === "all" || emp.department === filterDept
    return matchesSearch && matchesDept
  })

  const toggleStatus = (id: number) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, status: emp.status === "active" ? "inactive" : "active" } : emp
    ))
  }

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.email && newEmployee.department) {
      const newEmp: Employee = {
        id: Math.max(...employees.map(e => e.id)) + 1,
        name: newEmployee.name,
        email: newEmployee.email,
        phone: newEmployee.phone,
        department: newEmployee.department,
        badge: `EMP${String(employees.length + 1).padStart(3, '0')}`,
        status: "active",
        balance: 0,
        mealsThisMonth: 0,
        joinDate: new Date().toISOString().split('T')[0],
      }
      setEmployees([...employees, newEmp])
      setNewEmployee({ name: "", email: "", phone: "", department: "" })
      setIsAddDialogOpen(false)
    }
  }

  const stats = {
    total: employees.length,
    active: employees.filter(e => e.status === "active").length,
    totalBalance: employees.reduce((sum, e) => sum + e.balance, 0),
    avgMeals: Math.round(employees.reduce((sum, e) => sum + e.mealsThisMonth, 0) / employees.length),
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Empleados</h1>
          <p className="text-muted-foreground mt-1">Gestiona los empleados registrados en el comedor</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-5 h-5 mr-2" />
              Nuevo Empleado
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Empleado</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nombre Completo</Label>
                <Input 
                  placeholder="Ej: Juan Pérez"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Correo Electrónico</Label>
                <Input 
                  type="email"
                  placeholder="correo@empresa.com"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input 
                  placeholder="809-555-0100"
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Departamento</Label>
                <Select 
                  value={newEmployee.department}
                  onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addEmployee} className="w-full">
                Registrar Empleado
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Empleados</p>
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
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">${stats.totalBalance.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Balance Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-chart-4/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.avgMeals}</p>
                <p className="text-sm text-muted-foreground">Comidas/Mes Prom.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nombre, correo o carnet..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterDept} onValueChange={setFilterDept}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Lista de Empleados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empleado</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Carnet</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Comidas/Mes</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map(employee => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-semibold text-primary">{employee.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium">{employee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {employee.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{employee.department}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{employee.badge}</TableCell>
                  <TableCell className="font-semibold">${employee.balance.toFixed(2)}</TableCell>
                  <TableCell>{employee.mealsThisMonth}</TableCell>
                  <TableCell>
                    <Badge className={employee.status === "active" 
                      ? "bg-primary/20 text-primary hover:bg-primary/30" 
                      : "bg-muted text-muted-foreground"
                    }>
                      {employee.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toggleStatus(employee.id)}>
                          {employee.status === "active" ? (
                            <><X className="w-4 h-4 mr-2" /> Desactivar</>
                          ) : (
                            <><Check className="w-4 h-4 mr-2" /> Activar</>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard className="w-4 h-4 mr-2" /> Recargar Saldo
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="w-4 h-4 mr-2" /> Ver Historial
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
