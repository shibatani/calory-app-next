import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function  CaloryList(props) {

  return (
    <div>
      <TableContainer sx={{ maxWidth: 800, margin: 'auto' }} component={Paper}>
        <Table aria-label="simple table">
        <TableHead>
            <TableRow>
              <TableCell>名前</TableCell>
              <TableCell align="right">日付</TableCell>
              <TableCell align="right">種別</TableCell>
              <TableCell align="right">カロリー(kcal)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {props.calories.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.kind}</TableCell>
              <TableCell align="right">{row.calory}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}