import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import CaloryList from '../../components/caloryList'
import Loading from '../../plugins/loading'
import { CaloryParams, CaloriesState } from '../../types/calory'
import { fetchCalories, DispatchCalories, deleteCalory } from '../../store/calories'

export default function CaloriesListPage() {
  const router = useRouter()
  const dispatch = useDispatch<DispatchCalories>()
  const calories = useSelector((state: CaloriesState) => state.calories)
  const loading = useSelector((state: CaloriesState) => state.loading)

  useEffect(() => {
    dispatch(fetchCalories()) 
  }, [])

  const onEdit = (params: CaloryParams) => {
    router.push(`/calories/${params.id}`)
  }

  const onDelete = async (params: CaloryParams) => {
    await dispatch(deleteCalory(params.id))
    router.reload()
  }

  return (
    <>
      <CaloryList 
        calories={calories} 
        onEdit={onEdit} 
        onDelete={onDelete} 
      />
      <Loading loading={loading} />
    </>
  )
}