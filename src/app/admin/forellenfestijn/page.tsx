'use client'

import { db } from '@/lib/firebase' 
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface Reservation {
  id: string
  arrival: string
}

export default function ForellenFestijnAdminPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  
  useEffect(() => {
    console.log('Fetching reservations')
    getReservations().then((result) => {
      setReservations(result)
    })
  }, [])

  return <>
    <h1>Found {reservations.length} reservations</h1>
    <ul>
      {Object.entries(countByArrival(reservations))
        .toSorted((entry1, entry2) => entry1[0].localeCompare(entry2[0]))
        .map(entry => <li key={entry[0]}>{entry[0]} <b>{entry[1]}</b></li>)}
    </ul>
  </>
}

async function getReservations(): Promise<Reservation[]> {
  const querySnapshot = await getDocs(collection(db, "forellenfestijn"));
  console.log(querySnapshot.docs)
  return querySnapshot.docs.map((res) => ({ ...res.data(), id: res.id })) as Reservation[];
}

function countByArrival(reservations: Reservation[]) {
  return reservations.reduce((result: { [arrival: string]: number }, reservation) => {
    const arrival = reservation.arrival
    if (!result[arrival]) result[arrival] = 0
    return { ...result, [arrival]: result[arrival] + 1}
  }, {})
}