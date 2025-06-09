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
          if (userData.username === "admin") {
            console.log("Admin user detected on normal dashboard, redirecting...")
            window.location.href = "/admin/dashboard" // Force hard redirect
          }
        } catch (error) {
          console.error("Error parsing user session:", error)
        }
      }
    }

    // Check immediately
    checkAdminStatus()
  }, [router])

  return null
}
