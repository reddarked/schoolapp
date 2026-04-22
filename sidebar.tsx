"use client"

import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Users, 
  CalendarDays, 
  BarChart3, 
  Settings,
  ChefHat,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Panel Principal", icon: LayoutDashboard },
  { id: "menu", label: "Menú del Día", icon: UtensilsCrossed },
  { id: "employees", label: "Empleados", icon: Users },
  { id: "reservations", label: "Reservaciones", icon: CalendarDays },
  { id: "reports", label: "Reportes", icon: BarChart3 },
  { id: "settings", label: "Configuración", icon: Settings },
]

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-sidebar-primary flex items-center justify-center shadow-lg">
            <ChefHat className="w-7 h-7 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Comedor</h1>
            <p className="text-xs text-sidebar-foreground/70">Sistema de Gestión</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg" 
                      : "hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sidebar-accent/50">
          <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold">A</span>
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Admin</p>
            <p className="text-xs text-sidebar-foreground/60">Administrador</p>
          </div>
          <button className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
