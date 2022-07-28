import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from 'next/router'
import db from '../../utils/fire'

import CaloryList from '../../components/caloryList'
import Loading from '../../plugins/loading'
import { CaloryParams } from '../../types/calory'

export default function CaloriesListPage() {
  const router = useRouter()
  const [calories, setCalories] = useState<CaloryParams[]>([])
  const [progress, setProgress] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      let data = []
      setProgress(true)
      const caloriesRef = collection(db, "calories")
      const q = query(caloriesRef, orderBy("date", "desc"), orderBy("kind"))
      const caloriesSnapshot = await getDocs(q)
      caloriesSnapshot.forEach((calorySnapshot) => {
        const calory = calorySnapshot.data()
        calory["id"] = calorySnapshot.id
        data.push(calory)
      })
      setCalories(data)
      setProgress(false)
    })()
  }, [])

  const onEdit = (params: CaloryParams) => {
    router.push(`/calories/${params.id}`)
  }

  const onDelete = async (params: CaloryParams) => {
    setProgress(true)
    await deleteDoc(doc(db, "calories", params.id))
    router.reload()
    setProgress(false)
  }

  return (
    <div>
      <CaloryList 
        calories={calories} 
        onEdit={onEdit} 
        onDelete={onDelete} 
      />
      <Loading progress={progress} />
    </div>
  )
}