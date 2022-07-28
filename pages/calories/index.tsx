import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import CaloryList from '../../components/caloryList'
import db from '../../utils/fire'

import { CaloryParams } from '../../types/calory'

export default function CaloriesListPage() {
  const [calories, setCalories] = useState<CaloryParams[]>([])

  useEffect(() => {
    (async () => {
      let data = []
      const caloriesRef = collection(db, "calories")
      const q = query(caloriesRef, orderBy("date", "desc"), orderBy("kind"))
      const caloriesSnapshot = await getDocs(q)
      caloriesSnapshot.forEach((calorySnapshot) => {
        const calory = calorySnapshot.data()
        calory["id"] = calorySnapshot.id
        data.push(calory)
      })
      setCalories(data)
    })()
  }, [])

  return (
    <div>
      <CaloryList calories={calories}></CaloryList>
    </div>
  )
}