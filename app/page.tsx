import LoginForm from "@/components/login-form"
import DebugSupabase from "@/components/debug-supabase"

export default async function Home() {
  // Remove the session check for now to debug

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Vehicle Condition Tracker</h1>
          <p className="text-muted-foreground mt-2">Log in to track vehicle conditions</p>
        </div>
        <LoginForm />
        <DebugSupabase />
      </div>
    </main>
  )
}
