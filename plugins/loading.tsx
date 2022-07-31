import { Backdrop, CircularProgress } from '@mui/material'

type Props = {
  loading: boolean
}

export default function Loading(props: Props) {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}