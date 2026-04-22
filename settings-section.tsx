"use client"

import { useState } from "react"
import { 
  Settings, 
  Bell, 
  Clock, 
  Users, 
  Building2,
  Save,
  CreditCard,
  Utensils,
  Shield,
  Palette
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SettingsSection() {
  const [settings, setSettings] = useState({
    companyName: "Empresa ABC",
    maxCapacity: "300",
    openTime: "11:30",
    closeTime: "15:00",
    reservationLimit: "30",
    emailNotifications: true,
    pushNotifications: true,
    dailyReport: true,
    lowStockAlert: true,
    defaultBalance: "50",
    mealSubsidy: "30",
    requireApproval: false,
    allowGuests: true,
    maxGuests: "5",
  })

  const handleChange = (key: string, value: string | boolean) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground mt-1">Administra las preferencias del sistema</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-card shadow-lg border p-1">
          <TabsTrigger value="general" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Building2 className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Clock className="w-4 h-4 mr-2" />
            Horarios
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Bell className="w-4 h-4 mr-2" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <CreditCard className="w-4 h-4 mr-2" />
            Facturación
          </TabsTrigger>
          <TabsTrigger value="policies" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Shield className="w-4 h-4 mr-2" />
            Políticas
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Información del Comedor
              </CardTitle>
              <CardDescription>Configura la información básica del establecimiento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Nombre de la Empresa</Label>
                  <Input 
                    value={settings.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Capacidad Máxima</Label>
                  <Input 
                    type="number"
                    value={settings.maxCapacity}
                    onChange={(e) => handleChange("maxCapacity", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Número máximo de comensales por servicio</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Apariencia
              </CardTitle>
              <CardDescription>Personaliza la apariencia del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Tema del Sistema</Label>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Oscuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <Select defaultValue="es">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Settings */}
        <TabsContent value="schedule" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Horarios de Operación
              </CardTitle>
              <CardDescription>Define los horarios de servicio del comedor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Hora de Apertura</Label>
                  <Input 
                    type="time"
                    value={settings.openTime}
                    onChange={(e) => handleChange("openTime", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hora de Cierre</Label>
                  <Input 
                    type="time"
                    value={settings.closeTime}
                    onChange={(e) => handleChange("closeTime", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Límite de Reservaciones por Hora</Label>
                  <Input 
                    type="number"
                    value={settings.reservationLimit}
                    onChange={(e) => handleChange("reservationLimit", e.target.value)}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Días de Servicio</h4>
                <div className="flex flex-wrap gap-3">
                  {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day, index) => (
                    <Button 
                      key={day}
                      variant={index < 5 ? "default" : "outline"}
                      className={index < 5 ? "bg-primary" : ""}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Preferencias de Notificación
              </CardTitle>
              <CardDescription>Configura cómo y cuándo recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium">Notificaciones por Email</p>
                    <p className="text-sm text-muted-foreground">Recibe alertas importantes por correo</p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium">Notificaciones Push</p>
                    <p className="text-sm text-muted-foreground">Alertas en tiempo real en el navegador</p>
                  </div>
                  <Switch 
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleChange("pushNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium">Reporte Diario</p>
                    <p className="text-sm text-muted-foreground">Resumen automático al final del día</p>
                  </div>
                  <Switch 
                    checked={settings.dailyReport}
                    onCheckedChange={(checked) => handleChange("dailyReport", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium">Alerta de Stock Bajo</p>
                    <p className="text-sm text-muted-foreground">Aviso cuando los ingredientes estén por agotarse</p>
                  </div>
                  <Switch 
                    checked={settings.lowStockAlert}
                    onCheckedChange={(checked) => handleChange("lowStockAlert", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Configuración de Facturación
              </CardTitle>
              <CardDescription>Administra los parámetros de cobro y subsidios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Saldo Inicial por Empleado ($)</Label>
                  <Input 
                    type="number"
                    value={settings.defaultBalance}
                    onChange={(e) => handleChange("defaultBalance", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Saldo asignado automáticamente a nuevos empleados</p>
                </div>
                <div className="space-y-2">
                  <Label>Subsidio de Comida (%)</Label>
                  <Input 
                    type="number"
                    value={settings.mealSubsidy}
                    onChange={(e) => handleChange("mealSubsidy", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Porcentaje del costo cubierto por la empresa</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Métodos de Pago Aceptados</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Saldo de Cuenta", "Tarjeta de Débito", "Tarjeta de Crédito", "Efectivo"].map((method) => (
                    <div 
                      key={method}
                      className="flex items-center gap-2 p-3 rounded-lg border bg-muted/30"
                    >
                      <CreditCard className="w-4 h-4 text-primary" />
                      <span className="text-sm">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies Settings */}
        <TabsContent value="policies" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Políticas del Comedor
              </CardTitle>
              <CardDescription>Define las reglas y restricciones del servicio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium">Requerir Aprobación de Reservaciones</p>
                    <p className="text-sm text-muted-foreground">Las reservaciones deben ser aprobadas por un administrador</p>
                  </div>
                  <Switch 
                    checked={settings.requireApproval}
                    onCheckedChange={(checked) => handleChange("requireApproval", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium">Permitir Invitados Externos</p>
                    <p className="text-sm text-muted-foreground">Los empleados pueden traer invitados</p>
                  </div>
                  <Switch 
                    checked={settings.allowGuests}
                    onCheckedChange={(checked) => handleChange("allowGuests", checked)}
                  />
                </div>

                {settings.allowGuests && (
                  <div className="ml-4 p-4 rounded-xl border border-dashed">
                    <Label>Máximo de Invitados por Empleado</Label>
                    <Input 
                      type="number"
                      className="mt-2 w-32"
                      value={settings.maxGuests}
                      onChange={(e) => handleChange("maxGuests", e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  Restricciones Alimentarias Soportadas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Vegetariano", "Vegano", "Sin Gluten", "Sin Lácteos", "Kosher", "Halal", "Bajo en Sodio", "Sin Frutos Secos"].map((restriction) => (
                    <Button key={restriction} variant="outline" size="sm">
                      {restriction}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90" size="lg">
          <Save className="w-5 h-5 mr-2" />
          Guardar Cambios
        </Button>
      </div>
    </div>
  )
}
