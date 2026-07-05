"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Stethoscope,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Pacientes",
    href: "/patients",
    icon: Users,
  },
  {
    name: "Consultas",
    href: "/encounters",
    icon: FileText,
  },
  {
    name: "Configuración",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 items-center gap-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-blue-900">
            Doctor AI
          </span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                        pathname === item.href
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-6 w-6 shrink-0",
                          pathname === item.href
                            ? "text-blue-600"
                            : "text-gray-400"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
