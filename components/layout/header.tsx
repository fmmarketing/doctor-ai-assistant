"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { logout } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { LogOut, Menu } from "lucide-react"

export function Header() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logout()
    })
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-x-6 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => {
          // Mobile menu toggle - to be implemented
        }}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1" />
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            disabled={isPending}
            className="text-gray-600 hover:text-red-600"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {isPending ? "Cerrando..." : "Cerrar Sesión"}
          </Button>
        </div>
      </div>
    </header>
  )
}
