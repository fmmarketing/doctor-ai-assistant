"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { signup } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope } from "lucide-react"
import { Suspense } from "react"

function SignupForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-600 rounded-full">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-blue-900">
          Crear Cuenta
        </CardTitle>
        <CardDescription>
          Regístrate para acceder al sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={signup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Nombre Completo</Label>
            <Input
              id="full_name"
              name="full_name"
              type="text"
              placeholder="Dr. Juan Pérez"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="doctor@ejemplo.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full">
            Crear Cuenta
          </Button>
          <div className="text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Inicia sesión
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <Suspense fallback={<div>Cargando...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  )
}
