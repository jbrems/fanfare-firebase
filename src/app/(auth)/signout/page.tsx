'use client'

import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignoutPage() {
  const router = useRouter()

  useEffect(() => {
    auth.signOut().then(() => {
      document.cookie = `current-user=; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:01 GMT`
      router.push('/')
    })
  }, [])
}