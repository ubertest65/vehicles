"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import DashboardHeader from "@/components/dashboard-header"
import VehicleEntryForm from "@/components/vehicle-entry-form"
import UserEntryHistory from "@/components/user-entry-history"

export default async function Dashboard() {
  // For now, we'll handle auth client-side since we're using a custom auth system
  // In a production app, you'd want server-side session validation

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardContent />
    </main>
  )
}

function DashboardContent() {
  const [user, setUser] = useState<any>(null)
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Check for user session
    const userSession = localStorage.getItem("user_session")
    if (!userSession) {
      router.push("/")
      return
    }

    const userData = JSON.parse(userSession)
    setUser(userData)

    // Fetch vehicles
    const fetchVehicles = async () => {
      const { data } = await supabase
        .from("vehicles")
        .select("id, license_plate, model")
        .eq("status", "aktiv")
        .order("license_plate")

      setVehicles(data || [])
      setLoading(false)
    }

    fetchVehicles()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <DashboardHeader username={user.username} />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Vehicle Condition Tracker</h1>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">New Vehicle Entry</h2>
            <VehicleEntryForm userId={user.id} vehicles={vehicles} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Recent Entries</h2>
            <UserEntryHistory userId={user.id} />
          </div>
        </div>
      </div>
    </>
  )
}
