import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import CaloryForm from '../../components/caloryForm'
import Loading from '../../plugins/loading'
import { FormModel } from '../../types/calory'
import { CaloriesState } from '../../types/calory'
import { createCalory, DispatchCalories } from '../../store/calories'

export default function CaloriesNewPage() {
  const router = useRouter()
  const dispatch = useDispatch<DispatchCalories>()
  const loading = useSelector((state: CaloriesState) => state.loading)

  const onSave = async (form: FormModel) => {
    await dispatch(createCalory(form))
    router.push('/calories')
  }

  return (
    <>
      <CaloryForm onSave={onSave} />
      <Loading loading={loading} />
    </>
  )
}