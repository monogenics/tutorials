import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

import { withStyles } from '@material-ui/core/styles';

import { compose } from 'recompose'
import getAllPretrainedInfo from './apis/getAllPretrainedInfo'
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    button: {
      margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    fab: {
        margin: theme.spacing.unit,
    },
  });

class Form extends Component {
    state = {
        word: '',
        wordError: '',
    }

    validateFormText = () => {
        let isError = false
        const errors = {
            wordError: '',
        }
        if (this.state.word.length < 3){
            isError = true
            errors.wordError = 'Word needs to be greater than 2 characters'
        }
        this.setState(errors)
        return isError
    }

    async getInfo(){
        const data = {load_all: 'False'}
        const encodedData = encodeURIComponent(data.load_all)
        const url = `https://pre-trained-models-dot-word2vec-01.appspot.com/pretrained_get_all_info?load_all=${encodedData}`
        console.log(url)

        const response = await fetch ( url, {method: "GET", })
        const json = await response.json()
        console.log(json)

    }

    async handleOnSubmit(e)  {
        e.preventDefault()
        //const result = this.getInfo()
        //console.log("handleOnSumit", result)
        const parameters={load_all: 'True'}
        const result = await getAllPretrainedInfo(parameters)
        console.log(result)

        //console.log(getAllPretrainedInfo())
    }
    
    async getSimilarWords(){
        const data = {word: this.state.word}
        const echo = 
          await (
            await fetch (
              'https://pre-trained-models-dot-word2vec-01.appspot.com/pretrained_similar_word', 
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
              }
            )
          ).json()   
        console.log(echo.similar_words, echo.degrees)
    }
    

    handleOnChange = (e) => {
        //console.log("Word2Vec --> handleOnChange", e.target.name, e.target.value)
        //this.props.onChange({[ e.target.name]: e.target.value })
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const { classes } = this.props

        return(
            <Paper>
                <form>
               
                    <TextField
                        name="word"
                        helperText={this.state.wordError}
                        id="outlined-word"
                        label="Word"
                        value={this.state.word}
                        margin="normal"
                        variant="outlined"
                        className={classes.textField}
                        onChange={e => this.handleOnChange(e)}
                        error = {this.state.wordError.length !== 0}
                    />
                    <br />

                    <Fab
                        variant="extended"
                        color="primary"
                        className={classes.margin}
                        onClick={(e) => this.handleOnSubmit(e)}
                    >
                        <NavigationIcon className={classes.extendedIcon} />
                        Similarity
                    </Fab>
                </form>

            </Paper>
            
        )

    }
}

export default compose (
    withStyles(styles)
) (Form)