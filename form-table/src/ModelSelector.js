import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class ModelSelector extends React.Component {
  
  handleChangeSwitch = name => event => {
    console.log("handleChangeSwitch->name: ",name)
    this.props.allEngines({ [name]: event.target.checked})
  }

  handleChangeCheckBoxes = name => event => {
    console.log("handleChangeCheckBoxes->name: ",name)
    this.props.models({ [name]: event.target.checked})
  };
  

  render() {

   console.log("render -> props:", this.props)

  
    return (
      
      <Paper >
      
        <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={this.props.checkedw2v}
              onChange={this.handleChangeSwitch('checkedw2v')}
            />
          }
          label="Deep Similarity"
        />

          {Object.entries(this.props.optionKeys).map((item,i) =>
            (
              <FormControlLabel
              key={`thc-${i}`}
              control={
                <Checkbox
                  checked={item[1]}
                  onChange={this.handleChangeCheckBoxes([item[0]])}
                  color="primary"
                />
              }
              label={item[0].toLocaleLowerCase().replace(/-/g, " ")}
            />
            )
            
          )

          }
        </FormGroup>
      </Paper>
    
    )
  }
}

ModelSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModelSelector);
