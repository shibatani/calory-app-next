import { useState, useEffect } from 'react'
import CaloryForm from '../../components/caloryForm'
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from '../../utils/fire'
import { useRouter } from 'next/router'

import { FormModel } from '../../types/calory'

export default function CaloriesListPage() {
  const router = useRouter()
  const id = router.query.id as string 
  const [calory, setCalory] = useState<FormModel>({
    title: "",
    calory: 0,
    date: "",
    kind: "",
  })

  useEffect(() => {
    (async() => {
      const docRef = doc(db, "calories", id)
      const docSnap = await getDoc(docRef) as any
      const data = docSnap.data()
      setCalory({...data})
    })()
  }, [])

  const onSave = async (form: FormModel) => {
    const docRef = doc(db, "calories", id);
    await setDoc(docRef, {...form})
    router.push('/calories')
  }

  return (
    <div>
      <CaloryForm formParams={calory} onSave={onSave}/>
    </div>
  )
}