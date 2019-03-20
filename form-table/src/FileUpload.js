import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Papa  from 'papaparse'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  input: {
    display: 'none',
  },
});

class FileUpload extends Component {
    
    handleOnSubmit = (e) => {
        const reader = new FileReader()
        reader.readAsText(e.target.files[0])
        reader.onload = (event) => {
            const cvsData = event.target.result;
            const papaData = Papa.parse(cvsData, {header: true})
            this.props.fileData(papaData)
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <input
                    accept=".csv"
                    className={classes.input}
                    id="outlined-button-file"
                    type="file"
                    onChange={e => this.handleOnSubmit(e)}
                    ref={input => {
                        this.filesInput = input;
                      }}
                />

                <label htmlFor="outlined-button-file">
                    <Button 
                        variant="contained" 
                        component="span" 
                        color="primary" 
                        className={classes.button}
                    >
                        {this.props.title}
                        <CloudUploadIcon className={classes.rightIcon} />
                    </Button>
                </label>
            </div>
        );
    }
}

FileUpload.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileUpload);