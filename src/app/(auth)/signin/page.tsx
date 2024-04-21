'use client'

import { auth } from "@/lib/firebase"
import { GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SigninPage() {
  const router = useRouter()

  getRedirectResult(auth).then((result) => {
    if (result?.user) {
      console.log('Sign in succesful', result.user)
      document.cookie = `current-user=${result.user.email}; domain=${window.location.hostname}; max-age=3600`
      router.push('/admin/forellenfestijn')
    }
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('User changed', user)
      console.log('Current user', auth.currentUser)
      if (!user) {
        console.log('Signing in...')
        signInWithRedirect(auth, new GoogleAuthProvider())
      }
    })
    return unsubscribe
  })

  return <span>Aanmeldprocedure wordt uitgevoerd...</span>
}