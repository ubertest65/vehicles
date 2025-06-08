"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard-header"
import AdminEntriesTable from "@/components/admin-entries-table"
import AdminFilters from "@/components/admin-filters"
import AdminVehicleList from "@/components/admin-vehicle-list"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Plus } from "lucide-react"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    drivers: [] as string[],
    vehicles: [] as string[],
    dateFrom: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 3 days ago
    dateTo: new Date().toISOString().split("T")[0], // today
    status: ["active"] as string[],
  })
  const router = useRouter()

  useEffect(() => {
    const checkAdminSession = async () => {
      try {
        const userSession = localStorage.getItem("user_session")
        if (!userSession) {
          router.push("/")
          return
        }

        const userData = JSON.parse(userSession)

        // Check if user is admin (role_id = 1)
        if (userData.role_id !== 1) {
          router.push("/dashboard")
          return
        }

        setUser(userData)
      } catch (error) {
        console.error("Error in admin dashboard:", error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    checkAdminSession()
  }, [router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading admin dashboard...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader username={user.username} isAdmin={true} />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/admin/users")} className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Manage Users
            </Button>
            <Button onClick={() => router.push("/admin/users/new")} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Driver
            </Button>
          </div>
        </div>

        <Tabs defaultValue="entries" className="space-y-6">
          <TabsList>
            <TabsTrigger value="entries">Vehicle Entries</TabsTrigger>
            <TabsTrigger value="vehicles">Manage Vehicles</TabsTrigger>
          </TabsList>

          <TabsContent value="entries" className="space-y-6">
            <AdminFilters filters={filters} onFiltersChange={setFilters} />
            <AdminEntriesTable filters={filters} />
          </TabsContent>

          <TabsContent value="vehicles">
            <AdminVehicleList />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
