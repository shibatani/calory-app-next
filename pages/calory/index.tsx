import { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore";
import CaloryList from '../../components/caloryList'
import db from '../../utils/fire'

export default function Index() {
  const [calories, setCalories] = useState([])

  useEffect(() => {
    (async() => {
      let data = []
      const caloriesSnapshot = await getDocs(collection(db, "calories"))
      caloriesSnapshot.forEach((calorySnapshot) => {
        data.push(calorySnapshot.data())
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