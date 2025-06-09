"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminRedirect() {
  const router = useRouter()

  useEffect(() => {
    const checkAdminStatus = () => {
      const userSession = localStorage.getItem("user_session")
      if (userSession) {
        try {
          const userData = JSON.parse(userSession)
          if (userData.role_id === 1) {
            console.log("Admin user detected on normal dashboard, redirecting...")
            router.replace("/admin/dashboard")
          }
        } catch (error) {
          console.error("Error parsing user session:", error)
        }
      }
    }

    // Check immediately
    checkAdminStatus()

    // Also check when the component mounts
    const interval = setInterval(checkAdminStatus, 1000)

    return () => clearInterval(interval)
  }, [router])

  return null
}
