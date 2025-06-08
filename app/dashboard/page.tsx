import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import DashboardHeader from "@/components/dashboard-header"
import VehicleEntryForm from "@/components/vehicle-entry-form"
import UserEntryHistory from "@/components/user-entry-history"

export default async function Dashboard() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  // Get user details
  const { data: user } = await supabase.from("users").select("id, username, role_id").eq("id", session.user.id).single()

  // Get vehicles
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("id, license_plate, model")
    .eq("status", "aktiv")
    .order("license_plate")

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader username={user?.username} />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Vehicle Condition Tracker</h1>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">New Vehicle Entry</h2>
            <VehicleEntryForm userId={user?.id} vehicles={vehicles || []} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Recent Entries</h2>
            <UserEntryHistory userId={user?.id} />
          </div>
        </div>
      </div>
    </main>
  )
}
