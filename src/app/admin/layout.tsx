'use client'

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"

export default function AdminLayout({ children }: { children: ReactNode}) {
  const router = useRouter()

  useEffect(() => {
    auth.authStateReady().then(() => {
      if (!auth.currentUser) router.push('/signin')
    })
  }, [router])

  return children
}