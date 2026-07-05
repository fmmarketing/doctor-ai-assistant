import { getProfile } from "@/lib/actions/profile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProfile } from "@/lib/actions/profile"
import { User } from "lucide-react"

export default async function SettingsPage() {
  const profile = await getProfile()

  async function handleSubmit(formData: FormData) {
    "use server"
    await updateProfile(formData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600">
          Administra tu perfil y configuración de cuenta
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle>Perfil del Doctor</CardTitle>
              <CardDescription>
                Actualiza tu información personal
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Nombre Completo</Label>
              <Input
                id="full_name"
                name="full_name"
                defaultValue={profile?.full_name || ""}
                placeholder="Dr. Juan Pérez"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={profile?.email || ""}
                placeholder="doctor@ejemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Rol</Label>
              <Input
                value={profile?.role || "doctor"}
                disabled
                className="bg-gray-50"
              />
            </div>
            <Button type="submit" className="w-full">
              Guardar Cambios
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
