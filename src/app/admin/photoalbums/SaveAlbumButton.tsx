'use client'

import { doc, setDoc } from "firebase/firestore"
import { Album } from "./PhotoAlbum"
import { db } from "@/lib/firebase"
import { useState } from "react"

export default function SaveAlbumButton({ album }: { album: Album }) {
  const [saved, setSaved] = useState(false)

  async function save() {
    await setDoc(doc(db, 'photoalbums', album.id), album)
    setSaved(true)
  }

  return saved ? null : <button onClick={save}>Toevoegen</button>
}