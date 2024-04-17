import { db } from '@/lib/firebase' 
import { collection, getDocs } from 'firebase/firestore';

export default async function ForellenFestijnAdminPage() {
  const reservations = await getReservations()
  return <h1>Found {reservations.length} reservations</h1>
}

async function getReservations() {
  const querySnapshot = await getDocs(collection(db, "forellenfestijn"));
  console.log(querySnapshot.docs)
  return querySnapshot.docs.map((res) => ({ ...res.data(), id: res.id }));
}