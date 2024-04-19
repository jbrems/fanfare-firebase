'use client'

import { db } from '@/lib/firebase' 
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function ForellenFestijnAdminPage() {
  const [reservations, setReservations] = useState<any[]>([])
  
  useEffect(() => {
    getReservations().then((result) => {
      setReservations(result)
    })
  }, [])
  return <h1>Found {reservations.length} reservations</h1>
}

async function getReservations(): Promise<any[]> {
  const querySnapshot = await getDocs(collection(db, "forellenfestijn"));
  console.log(querySnapshot.docs)
  return querySnapshot.docs.map((res) => ({ ...res.data(), id: res.id }));
}