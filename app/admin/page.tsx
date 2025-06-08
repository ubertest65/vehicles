import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import DashboardHeader from "@/components/dashboard-header"
import AdminVehicleList from "@/components/admin-vehicle-list"
import AdminUserList from "@/components/admin-user-list"

export default async function AdminDashboard() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  // Check if user is admin
  const { data: user } = await supabase
    .from("users")
    .select("id, username, role_id, roles(name)")
    .eq("id", session.user.id)
    .single()

  if (!user || user.roles?.name !== "admin") {
    redirect("/dashboard")
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader username={user?.username} isAdmin={true} />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Vehicles</h2>
            <AdminVehicleList />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
            <AdminUserList />
          </div>
        </div>
      </div>
    </main>
  )
}
