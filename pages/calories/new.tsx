import { useRouter } from 'next/router'
import { collection, addDoc } from "firebase/firestore";
import db from '../../utils/fire'

import CaloryForm from '../../components/caloryForm'
import { FormModel } from '../../types/calory'

export default function CaloriesNewPage() {
  const router = useRouter()

  const onSave = async (form: FormModel) => {
    await addDoc(collection(db, "calories"), {...form})
    router.push('/calories')
  }

  return (
    <div>
      <CaloryForm onSave={onSave}/>
    </div>
  )
}