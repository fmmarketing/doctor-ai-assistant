import { getPatient } from "@/lib/actions/patients"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Edit, Phone, Mail, Calendar, ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function PatientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const patient = await getPatient(id)

  if (!patient) {
    notFound()
  }

  const formatDate = (date: string | null) => {
    if (!date) return "No especificada"
    return new Date(date).toLocaleDateString("es", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/patients">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {patient.first_name} {patient.last_name}
          </h1>
          <p className="text-gray-600">Perfil del paciente</p>
        </div>
        <Link href={`/patients/${patient.id}/edit`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Patient Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Datos básicos del paciente</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-medium">{patient.phone || "No especificado"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{patient.email || "No especificado"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                  <p className="font-medium">{formatDate(patient.birth_date)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Género</p>
                <p className="font-medium capitalize">{patient.gender || "No especificado"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <CardTitle>Notas</CardTitle>
                <CardDescription>Observaciones y alergias</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-wrap">
              {patient.notes || "No hay notas registradas"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Consultation History Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Consultas</CardTitle>
          <CardDescription>
            Las consultas aparecerán aquí cuando se registren
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Aún no hay consultas registradas</p>
            <p className="text-sm mt-2">
              Las consultas se agregarán en el Milestone 4
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
