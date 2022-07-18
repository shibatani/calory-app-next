import { Button, Stack, TextField, MenuItem } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { FormModel } from '../types/calory'
import { format } from 'date-fns'

interface Props {
  onSave: (form: FormModel) => void
}

export default function CaloryList(props: Props) {
  const { register, control, handleSubmit } = useForm<FormModel>()
  const kinds = [
    {
      value: "breakfast",
      label: "朝食",
    },
    {
      value: "lunch",
      label: "昼食",
    },
    {
      value: "dinner",
      label: "夕食",
    },
    {
      value: "other",
      label: "その他",
    }
  ]

  const onSubmit: SubmitHandler<FormModel> = (form) => {
    form.date = format(new Date(form.date), 'yyyy-MM-dd')
    props.onSave(form)
  }

  return (
    <div>
      <Stack spacing={3} sx={{ maxWidth: 800, margin: 'auto' }}>
        <TextField
          required
          label="タイトル"
          {...register('title')}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="date"
            control={control}
            defaultValue={format(new Date(), 'yyyy-MM-dd')}
            render={({field}) => {
              return (
                <DesktopDatePicker
                  {...field}
                  label="日付"
                  renderInput={(params) => <TextField {...params}/>}
                />
              )
            }}
          />
        </LocalizationProvider>
        <Controller
          name="kind"
          control={control}
          defaultValue={'breakfast'}
          render={({field}) => {
            return (
              <TextField
                {...field}
                required
                label="種別"
                select
              >
                {kinds.map((kind) => (
                  <MenuItem key={kind.label} value={kind.value}>
                    {kind.label}
                  </MenuItem>
                ))}
              </TextField>
            )
          }}
        />
        <TextField
          required
          label="カロリー(kcal)"
          type="number"
          {...register('calory')}
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleSubmit(onSubmit)}
        >
          create
        </Button>
      </Stack>
    </div>
  )
}