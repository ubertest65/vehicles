"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Car, User, LogOut, Shield } from "lucide-react"

interface DashboardHeaderProps {
  username?: string
  isAdmin?: boolean
}

export default function DashboardHeader({ username, isAdmin = false }: DashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    // Clear local storage
    localStorage.removeItem("user_session")

    router.push("/")
    router.refresh()
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6" />
          <span className="font-bold text-lg">Vehicle Tracker</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {isAdmin ? (
            // Admin navigation
            <>
              <Link href="/admin/dashboard" className="text-sm font-medium hover:underline flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Admin Dashboard
              </Link>
              <Link href="/admin/users" className="text-sm font-medium hover:underline">
                Manage Users
              </Link>
            </>
          ) : (
            // Driver navigation
            <>
              <Link href="/dashboard" className="text-sm font-medium hover:underline">
                Dashboard
              </Link>
              <Link href="/history" className="text-sm font-medium hover:underline">
                History
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="text-sm font-medium">{username || "User"}</span>
            {isAdmin && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Admin</span>}
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
