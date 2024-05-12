'use client'

import { db } from '@/lib/firebase' 
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import styles from './page.module.css'

interface Reservation {
  id: string
  name: string
  arrival: string
  menu: {
    melon: string | 0
    soup: string | 0
    troutAlmond: string | 0
    troutArdennaise: string | 0
    troutNature: string | 0
    troutWine: string | 0
    volAuVent: string | 0
    volAuVentChild: string | 0
  }
}

export default function ForellenFestijnAdminPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [year, setYear] = useState<string>('2024')
  
  useEffect(() => {
    console.log('Fetching reservations')
    getReservations().then((result) => {
      setReservations(result.filter((res) => filterReservationsByYear(res, year)))
    })
  }, [year])

  return <>
    <select name="year" onChange={(event) => { setYear(event.target.value) }}>
      <option value="2023" selected={year === '2023'}>2023</option>
      <option value="2024" selected={year === '2024'}>2024</option>
    </select>
    <h1>{reservations.length} reservaties verwerkt</h1>
    <div className={styles.arrivals}>
      {Object.entries(countByArrival(reservations))
        .toSorted((entry1, entry2) => entry1[0].localeCompare(entry2[0]))
        .map(entry => <ArrivalStats key={entry[0]} arrival={entry[0]} stats={entry[1]} />)}
    </div>
  </>
}

async function getReservations(): Promise<Reservation[]> {
  const querySnapshot = await getDocs(collection(db, "forellenfestijn"));
  console.log(querySnapshot.docs)
  return querySnapshot.docs.map((res) => ({ ...res.data(), id: res.id })) as Reservation[];
}

function filterReservationsByYear(reservation: Reservation, year: string): boolean {
  return reservation.id.includes(`_${year}-`)
}

function countByArrival(reservations: Reservation[]) {
  return reservations.reduce((result: { [arrival: string]: { reservations: number, dishes: number, names: string[] } }, reservation) => {
    const arrival = reservation.arrival
    if (!result[arrival]) result[arrival] = { reservations: 0, dishes: 0, names: [] }
    return { ...result, [arrival]: { reservations: result[arrival].reservations + 1, dishes: result[arrival].dishes + countDishes(reservation), names: [...result[arrival].names, reservation.name] }}
  }, {})
}

function countDishes(reservation: Reservation): number {
  return Number(reservation.menu.troutAlmond) +
    Number(reservation.menu.troutArdennaise) +
    Number(reservation.menu.troutNature) +
    Number(reservation.menu.troutWine) +
    Number(reservation.menu.volAuVent) +
    Number(reservation.menu.volAuVentChild)
}

function ArrivalStats({ arrival, stats }: { arrival: string, stats: { reservations: number, dishes: number, names: string[] } }) {
  return <div className={styles.arrivalStats}>
    <div>{arrival}</div>
    <div className={styles.stats}>
      <div className={styles.stat}>
        <div className={styles.reservationsBar} style={{width: stats.reservations * 10 + 'px'}}></div>
        <div>{stats.reservations} reservaties</div>
      </div>
      <div className={styles.stat}>
        <div className={styles.dishesBar} style={{width: stats.dishes * 10 + 'px'}}></div>
        <div>{stats.dishes} gerechten</div>
      </div>
      <div className={`${styles.stat} ${styles.names}`}>{stats.names.join(', ')}</div>
    </div>
  </div>
}