import React, {useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {getUsers} from '../enteties/apiRequests'
import {Context} from '../store/Store' 
import { Link } from 'react-router-dom';


const columns = [
    { id: 'employee_name',label: 'employee_name',minWidth: 170,},
    { id: 'employee_age', label: 'employee_age', minWidth: 100 },
    { id: 'employee_salary', label: 'employee_salary', minWidth: 170 },
    { id: 'more_details', label: 'more_details', minWidth: 170 }
  ];

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

export const UsersList = (props) => {
    const [state, dispatch] = useContext(Context)
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [users, setUsers] = useState()

    const fetchData = async ()=> {

    //TODO here you should to get data about all users
       const usersList = await getUsers()
       setUsers(usersList)
    }

    const goToCandDeteils = (user)=> {
        dispatch({type:"SET_CAND_DETAILS", payload: user})
}

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    useEffect(()=>{
       !users && fetchData()
       users && console.log(users.data.data)
       return
    })

return (
   users ? <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                       {value} 
                    {column.id === 'more_details' ? 
                    <Link 
                        onClick={()=>goToCandDeteils(row['employee_name'])} 
                        to="/details">More about {row['employee_name']}
                    </Link>  : null}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.data.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper> : null
  );
};