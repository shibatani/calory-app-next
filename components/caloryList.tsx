import { DataGrid, GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router'

import { CaloryParams } from '../types/calory'
import Tag from './tag'

type Props = {
  calories: CaloryParams[]
  onEdit: (params: CaloryParams) => void
  onDelete: (params: CaloryParams) => void
}

export default function CaloryList(props: Props) {
  const router = useRouter()
  const columns: GridColDef[] = [
    { 
      field: 'title', 
      headerName: '名前', 
      width: 200, 
      sortable: false 
    },
    { 
      field: 'date', 
      headerName: '日付', 
      width: 200 
    },
    {
      field: 'kind',
      headerName: '種別',
      width: 150,
      renderCell: (params) => <Tag kind={params.row.kind} />
    },
    { 
      field: 'calory', 
      headerName: 'カロリー(kcal)', 
      width: 150 
    },
    {
      field: 'controlBtn',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <IconButton
              aria-label="edit"
              onClick={(event) => {
                onEdit(event, params.row)
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              onClick={(event) => {
                onDelete(event, params.row)
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div> 
        )
      }
    },
  ]

  const onEdit = (event, params: CaloryParams) => {
    event.stopPropagation()
    props.onEdit(params)
  }

  const onDelete = async (event, params: CaloryParams) => {
    event.stopPropagation()
    props.onDelete(params)
  }

  return (
    <div style={{ height: 550, maxWidth: 800, margin: 'auto' }}>
      <DataGrid
        rows={props.calories}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[25, 50, 100]}
        disableSelectionOnClick
      />
    </div>
  )
}