import { useState } from 'react'
import { useRouter } from 'next/router'

import { collection, addDoc } from "firebase/firestore"

import db from '../../utils/fire'
import CaloryForm from '../../components/caloryForm'
import Loading from '../../plugins/loading'
import { FormModel } from '../../types/calory'

export default function CaloriesNewPage() {
  const router = useRouter()
  const [progress, setProgress] = useState<boolean>(false)

  const onSave = async (form: FormModel) => {
    setProgress(true)
    await addDoc(collection(db, "calories"), { ...form })
    router.push('/calories')
    setProgress(false)
  }

  return (
    <>
      <CaloryForm onSave={onSave} />
      <Loading progress={progress} />
    </>
  )
}