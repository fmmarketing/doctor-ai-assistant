import { getPatients } from "@/lib/actions/patients"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Plus, Search, Phone, Mail, Calendar } from "lucide-react"
import Link from "next/link"

export default async function PatientsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const params = await searchParams
  const search = params.search || ""
  const patients = await getPatients(search)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-600">
            {patients.length} paciente{patients.length !== 1 ? "s" : ""} registrado{patients.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/patients/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Paciente
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <form className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                name="search"
                placeholder="Buscar por nombre o teléfono..."
                defaultValue={search}
                className="pl-10"
              />
            </div>
            <Button type="submit">Buscar</Button>
          </form>
        </CardContent>
      </Card>

      {/* Patients List */}
      {patients.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {search ? "No se encontraron pacientes" : "No hay pacientes aún"}
              </h3>
              <p className="text-gray-500 mb-4">
                {search
                  ? "Intenta con otros términos de búsqueda"
                  : "Comienza creando tu primer paciente"}
              </p>
              {!search && (
                <Link href="/patients/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Primer Paciente
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient) => (
            <Link key={patient.id} href={`/patients/${patient.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    {patient.first_name} {patient.last_name}
                  </CardTitle>
                  <CardDescription>
                    {patient.gender && (
                      <span className="capitalize">{patient.gender}</span>
                    )}
                    {patient.birth_date && (
                      <span className="ml-2">
                        · {new Date(patient.birth_date).toLocaleDateString("es")}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    {patient.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {patient.phone}
                      </div>
                    )}
                    {patient.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {patient.email}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      Creado: {new Date(patient.created_at).toLocaleDateString("es")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
