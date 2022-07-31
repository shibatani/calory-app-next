import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit'
import { collection, getDocs, query, orderBy, doc, getDoc, setDoc, addDoc, deleteDoc } from "firebase/firestore"
import { format } from 'date-fns'

import db from '../utils/fire'
import { CaloriesState, FormModel } from '../types/calory'

const initialState: CaloriesState = {
  calories: [],
  calory: {
    title: " ",
    calory: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
    kind: 1,
  },
  loading: false,
  error: null,
}

export const fetchCalories = createAsyncThunk('calories/fetchCalories',
  async () => {
    let data = []
    const caloriesRef = collection(db, "calories")
    const q = query(caloriesRef, orderBy("date", "desc"), orderBy("kind"))
    const response = await getDocs(q)
    response.forEach((calorySnapshot) => {
      const calory = calorySnapshot.data()
      calory["id"] = calorySnapshot.id
      data.push(calory)
    })
    return data
  } 
)

export const fetchCalory = createAsyncThunk('calories/fetchCalory',
  async (id: string) => {
    const docRef = doc(db, "calories", id)
    const response = await getDoc(docRef) as any
    const data = response.data()
    return data
  }
)

export const createCalory = createAsyncThunk('calories/createCalory',
  async (form: FormModel) => {
    await addDoc(collection(db, "calories"), { ...form })
  }
)

export const updateCalory = createAsyncThunk('calories/updateCalory', 
  async ({id, form}: {id: string, form: FormModel }) => {
    const docRef = doc(db, "calories", id)
    await setDoc(docRef, { ...form }) 
  }
)

export const deleteCalory = createAsyncThunk('calories/deleteCalory',
  async (id: string) => {
    await deleteDoc(doc(db, "calories", id))
  }
)

const caloriesSlice = createSlice({
  name: 'calories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCalories.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCalories.fulfilled, (state, action) => {
        state.loading = false
        state.calories = action.payload
      })
      .addCase(fetchCalories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchCalory.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCalory.fulfilled, (state, action) => {
        state.loading = false
        state.calory = action.payload
      })
      .addCase(fetchCalory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createCalory.pending, (state) => {
        state.loading = true
      })
      .addCase(createCalory.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createCalory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateCalory.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCalory.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateCalory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteCalory.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCalory.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteCalory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

const store = configureStore({
  reducer: caloriesSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})

export default store
export type DispatchCalories = typeof store.dispatch