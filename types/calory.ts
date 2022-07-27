export type CaloryParams = {
  id: string
  title: string
  calory: number
  date: string
  kind: number
}

export type FormModel = Omit<CaloryParams, "id">