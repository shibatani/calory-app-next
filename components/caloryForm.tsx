import { useEffect, useMemo } from 'react'
import { Button, Stack, TextField, MenuItem } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { format } from 'date-fns'

import { FormModel } from '../types/calory'

interface Props {
  formParams?: FormModel,
  onSave: (form: FormModel) => void
}

export default function CaloryForm(props: Props) {
  const { register, control, handleSubmit, reset } = useForm<FormModel>({
    defaultValues: useMemo(() => {
      return props.formParams;
    }, [props])
  })

  useEffect(() => {
    reset(props.formParams);
  }, [props.formParams]);

  const kinds = [
    {
      value: 1,
      label: "朝食",
    },
    {
      value: 2,
      label: "昼食",
    },
    {
      value: 3,
      label: "夕食",
    },
    {
      value: 4,
      label: "その他",
    }
  ]

  const onSubmit: SubmitHandler<FormModel> = (form) => {
    form.date = format(new Date(form.date), 'yyyy/MM/dd')
    props.onSave(form)
  }

  return (
    <>
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
            render={({ field }) => {
              return (
                <DesktopDatePicker
                  {...field}
                  label="日付"
                  renderInput={(params) => <TextField {...params} />}
                />
              )
            }}
          />
        </LocalizationProvider>
        <Controller
          name="kind"
          control={control}
          defaultValue={1}
          render={({ field }) => {
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
          保存
        </Button>
      </Stack>
    </>
  )
}