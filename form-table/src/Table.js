import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SimpleTable(props) {
  const { classes, data, header } = props;
  //rows.map(row => console.log(row))
  //header.map(value => console.log(value.name, value.prop))
  //console.log(data)
  //console.log(data[0])
  //header.map((x,i) => console.log(x,i))
  const row = (x,i, header) => (
      <TableRow key={`tr-${i}`}>

            {header.map((y,k) => (
                //console.log(x[y.prop])
                <TableCell key={`tc-${k}`}>
                    {x[y.prop]}
                </TableCell>

                )
            )}
      
      </TableRow>
  )

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {
                header.map((x,i) =>
                <TableCell key={`thc-${i}`}>{x.name}</TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
        {  data.map((x,i) => row(x,i,header)) }         
        </TableBody>
    

      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
