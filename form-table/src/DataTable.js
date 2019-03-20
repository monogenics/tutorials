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
        minWidth: 2500,
    },
    row: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
        },
    },
});

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 12,
    },
}))(TableCell);

function DataTable (props) {
    const { classes } = props;

    const {parsedData} = props
    
    return(

        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                    {
                        parsedData.meta.fields.map((item,i) => 
                            <CustomTableCell  key={`thc-${i}`}>
                                {item}
                            </CustomTableCell> )
                    }
                    </TableRow>
                </TableHead>

                <TableBody>
                    { 
                        parsedData.data.map((row,i) => 
                            <TableRow className={classes.row} key={`tr-${i}`}>
                                { 
                                    parsedData.meta.fields.map((item,k) => 
                                        <CustomTableCell component="th" scope="row" key={`tc-${k}`}>
                                            {row[item]}
                                        </CustomTableCell> )}
                            </TableRow>)}      
                </TableBody>
                   

            </Table>
        </Paper>
    )
}
DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataTable);
