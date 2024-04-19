'use client'

import { useUser } from "@/app/(auth)/user.hook";
import Link from "next/link";

export function Footer() {
  const { user } = useUser()

  return <footer>
    I am the footer - 
    <Link href="/admin/forellenfestijn">Admin</Link> - 
    {user && <Link href="/signout">Log out</Link>}
    {!user && <Link href="/signin">Log in</Link>}
  </footer>
}