"use client"

import { useState } from "react"
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ChefHat,
  Leaf,
  Flame,
  Star
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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

interface MenuItem {
  id: number
  name: string
  category: string
  price: number
  available: boolean
  calories: number
  isVegetarian: boolean
  isSpicy: boolean
  rating: number
}

const initialMenu: MenuItem[] = [
  { id: 1, name: "Pollo al Horno con Papas", category: "Principal", price: 8.50, available: true, calories: 450, isVegetarian: false, isSpicy: false, rating: 4.8 },
  { id: 2, name: "Pasta Alfredo", category: "Principal", price: 7.00, available: true, calories: 520, isVegetarian: true, isSpicy: false, rating: 4.5 },
  { id: 3, name: "Risotto de Champiñones", category: "Vegetariano", price: 8.00, available: true, calories: 380, isVegetarian: true, isSpicy: false, rating: 4.7 },
  { id: 4, name: "Crema de Verduras", category: "Entrada", price: 3.50, available: true, calories: 150, isVegetarian: true, isSpicy: false, rating: 4.3 },
  { id: 5, name: "Ensalada César", category: "Entrada", price: 5.00, available: true, calories: 280, isVegetarian: false, isSpicy: false, rating: 4.6 },
  { id: 6, name: "Tacos de Res Picantes", category: "Principal", price: 9.00, available: false, calories: 520, isVegetarian: false, isSpicy: true, rating: 4.9 },
  { id: 7, name: "Flan de Vainilla", category: "Postre", price: 3.00, available: true, calories: 220, isVegetarian: true, isSpicy: false, rating: 4.4 },
  { id: 8, name: "Brownie con Helado", category: "Postre", price: 4.50, available: true, calories: 480, isVegetarian: true, isSpicy: false, rating: 4.8 },
]

export function MenuSection() {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    calories: "",
    isVegetarian: false,
    isSpicy: false,
  })

  const categories = ["all", "Entrada", "Principal", "Vegetariano", "Postre"]

  const filteredMenu = menu.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const toggleAvailability = (id: number) => {
    setMenu(menu.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ))
  }

  const deleteItem = (id: number) => {
    setMenu(menu.filter(item => item.id !== id))
  }

  const addItem = () => {
    if (newItem.name && newItem.category && newItem.price) {
      const newMenuItem: MenuItem = {
        id: Math.max(...menu.map(m => m.id)) + 1,
        name: newItem.name,
        category: newItem.category,
        price: parseFloat(newItem.price),
        available: true,
        calories: parseInt(newItem.calories) || 0,
        isVegetarian: newItem.isVegetarian,
        isSpicy: newItem.isSpicy,
        rating: 0,
      }
      setMenu([...menu, newMenuItem])
      setNewItem({ name: "", category: "", price: "", calories: "", isVegetarian: false, isSpicy: false })
      setIsAddDialogOpen(false)
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Menú del Día</h1>
          <p className="text-muted-foreground mt-1">Administra los platos disponibles</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-5 h-5 mr-2" />
              Agregar Plato
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Plato</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nombre del Plato</Label>
                <Input 
                  placeholder="Ej: Pollo a la Plancha"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Select 
                  value={newItem.category}
                  onValueChange={(value) => setNewItem({...newItem, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entrada">Entrada</SelectItem>
                    <SelectItem value="Principal">Principal</SelectItem>
                    <SelectItem value="Vegetariano">Vegetariano</SelectItem>
                    <SelectItem value="Postre">Postre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Precio ($)</Label>
                  <Input 
                    type="number"
                    placeholder="0.00"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Calorías</Label>
                  <Input 
                    type="number"
                    placeholder="0"
                    value={newItem.calories}
                    onChange={(e) => setNewItem({...newItem, calories: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={newItem.isVegetarian}
                    onChange={(e) => setNewItem({...newItem, isVegetarian: e.target.checked})}
                    className="w-4 h-4 rounded border-input"
                  />
                  <Leaf className="w-4 h-4 text-primary" />
                  <span className="text-sm">Vegetariano</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={newItem.isSpicy}
                    onChange={(e) => setNewItem({...newItem, isSpicy: e.target.checked})}
                    className="w-4 h-4 rounded border-input"
                  />
                  <Flame className="w-4 h-4 text-accent" />
                  <span className="text-sm">Picante</span>
                </label>
              </div>
              <Button onClick={addItem} className="w-full">
                Agregar Plato
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Buscar plato..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <Button 
                  key={cat}
                  variant={filterCategory === cat ? "default" : "outline"}
                  onClick={() => setFilterCategory(cat)}
                  className={filterCategory === cat ? "bg-primary" : ""}
                >
                  {cat === "all" ? "Todos" : cat}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map(item => (
          <Card 
            key={item.id} 
            className={`border-0 shadow-lg hover:shadow-xl transition-all ${!item.available ? 'opacity-60' : ''}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="outline" className="mb-2">{item.category}</Badge>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </div>
                <div className="flex items-center gap-1 bg-accent/20 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm font-semibold text-accent">{item.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {item.isVegetarian && (
                    <div className="flex items-center gap-1 text-primary">
                      <Leaf className="w-4 h-4" />
                      <span className="text-xs">Vegetariano</span>
                    </div>
                  )}
                  {item.isSpicy && (
                    <div className="flex items-center gap-1 text-accent">
                      <Flame className="w-4 h-4" />
                      <span className="text-xs">Picante</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <ChefHat className="w-4 h-4" />
                    <span className="text-xs">{item.calories} cal</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</span>
                  <Badge className={item.available ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}>
                    {item.available ? 'Disponible' : 'Agotado'}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => toggleAvailability(item.id)}
                  >
                    {item.available ? 'Marcar Agotado' : 'Habilitar'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMenu.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <ChefHat className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground">No se encontraron platos</h3>
            <p className="text-muted-foreground mt-2">Intenta con otros filtros o agrega un nuevo plato</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
