import { Backdrop, CircularProgress } from '@mui/material'

type Props = {
  progress: boolean
}

export default function Loading(props: Props) {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}