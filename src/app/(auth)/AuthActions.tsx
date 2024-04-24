'use client'

import Link from "next/link"
import { useUser } from "./user.hook"
import styles from './AuthActions.module.css'

export default function AuthActions() {
  const { user } = useUser()

  if (!user) {
    return <Link href="/signin">login</Link>
  }

  return <div className={styles.authActions}>
    <img className={styles.profilePicture} src={user.photoURL} aria-hidden />
    <span>{user.displayName}</span>
    <span className={styles.logoutLink}>(<Link href="/signout">logout</Link>)</span>
  </div>
}