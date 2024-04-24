import Link from "next/link";
import styles from './Header.module.css'
import AuthActions from "@/app/(auth)/AuthActions";

export function Header() {
  return <header className={styles.header}>
    <Link href="/">Home</Link>
    <Link href="/admin/forellenfestijn">Forellenfestijn</Link>
    <Link href="/admin/photoalbums">Foto albums</Link>
    <div className={styles.spacer}></div>
    <AuthActions />
  </header>
}