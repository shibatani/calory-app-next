import { DataGrid, GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router'
import db from '../utils/fire'
import { doc, deleteDoc } from "firebase/firestore";

import { CaloryParams } from '../types/calory'
import Tag from './tag'

type Props = {
  calories: CaloryParams[]
}

export default function CaloryList(props: Props) {
  const router = useRouter()
  const columns: GridColDef[] = [
    { field: 'title', headerName: '名前', width: 200, sortable: false },
    { field: 'date', headerName: '日付', width: 200 },
    {
      field: 'kind',
      headerName: '種別',
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Tag kind={params.row.kind} />
        )
      }
    },
    { field: 'calory', headerName: 'カロリー(kcal)', width: 150 },
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
    router.push(`/calories/${params.id}`)
  }

  const onDelete = async (event, params: CaloryParams) => {
    event.stopPropagation()
    await deleteDoc(doc(db, "calories", params.id))
    router.reload()
  }

  return (
    <div style={{ height: 550, maxWidth: 800, margin: 'auto' }}>
      <DataGrid
        rows={props.calories}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[25, 50, 100]}
        initialState={{
          sorting: {
            sortModel: [
              {
                field: 'date',
                sort: 'desc',
              },
            ],
          },
        }}
      />
    </div>
  )
}