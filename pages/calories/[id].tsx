import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import CaloryForm from '../../components/caloryForm'
import Loading from '../../plugins/loading'
import { FormModel, CaloriesState } from '../../types/calory'
import { fetchCalory, updateCalory, DispatchCalories } from '../../store/calories'

export default function CaloriesDetailPage() {
  const router = useRouter()
  const dispatch = useDispatch<DispatchCalories>()
  const calory = useSelector((state: CaloriesState) => state.calory)
  const loading = useSelector((state: CaloriesState) => state.loading)
  const [id, setId] = useState<string>()

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id as string
      setId(id);
    }
  }, [router]);

  useEffect(() => {
    if (id) dispatch(fetchCalory(id))
  }, [id])

  const onSave = async (form: FormModel) => {
    await dispatch(updateCalory({id, form}))
    router.push('/calories')
  }

  return (
    <>
      <CaloryForm formParams={calory} onSave={onSave} />
      <Loading loading={loading} />
    </>
  )
}