export type CaloryParams = {
  id: string
  title: string
  calory: number
  date: string
  kind: string
}

export type FormModel = Omit<CaloryParams, "id">