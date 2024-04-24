'use client'

import { useUser } from "@/app/(auth)/user.hook";
import styles from './Footer.module.css'

export function Footer() {
  const { user } = useUser()

  return <footer className={styles.footer}>
    &copy; Koninklijke Fanfare De Vrienden van &apos;t Recht VZW Blaasveld
  </footer>
}