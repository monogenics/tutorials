import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import { compose } from 'recompose'

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
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
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        username: '',
        usernameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',

    }

    handleOnChange = (e) => {
        console.log("Form.js --> handleOnChange", e.target.name, e.target.value)
        //this.props.onChange({[ e.target.name]: e.target.value })
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validateFormText = () => {
        let isError = false
        const errors = {
            firstNameError: '',
            lastNameError: '',
            usernameError: '',
            emailError: '',
            passwordError: '',
        }
        if (this.state.username.length < 5){
            isError = true
            errors.usernameError = 'Username needs to be at least 5 characters'
        }

        if (this.state.email.indexOf("@") === -1 ){
            isError = true
            errors.emailError = 'Requires valid email'
        }

        this.setState(errors)

        return isError
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        console.log("Form.js --> handleOnSubmit", this.state)
        //check for errors
        const err = this.validateFormText();
        if (!err){
            this.props.onSubmit(this.state)
             //clear form
            this.setState({
                firstName: '',
                firstNameError: '',
                lastName: '',
                lastNameError: '',
                username: '',
                usernameError: '',
                email: '',
                emailError: '',
                password: '',
                passwordError: '',
            })

        }
       
    }

    render(){
        const { classes } = this.props

        return(
            <form>
                <TextField
                    name="firstName"
                    helperText={this.state.firstNameError}
                    id="outlined-fname"
                    label="First Name"
                    value={this.state.firstName}
                    onChange={e => this.handleOnChange(e)}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                />
                <TextField
                    name="lastName"
                    helperText="Last Name"
                    id="outlined-lname"
                    label="Last Name"
                    value={this.state.lastName}
                    onChange={e => this.handleOnChange(e)}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                />
                <TextField
                    name="username"
                    helperText={this.state.usernameError}
                    id="outlined-uname"
                    label="Username"
                    value={this.state.username}
                    onChange={e => this.handleOnChange(e)}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                    error = {this.state.usernameError.length !== 0}
                />
                <TextField
                    name="email"
                    helperText={this.state.emailError}
                    id="outlined-email"
                    label="Email"
                    value={this.state.email}
                    onChange={e => this.handleOnChange(e)}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                    error = {this.state.emailError.length !== 0}
                />
                <TextField
                    name="password"
                    type="password"
                    helperText="Password"
                    id="outlined-password"
                    label="Password"
                    value={this.state.password}
                    onChange={e => this.handleOnChange(e)}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                />
                 <Fab 
                    color="primary" 
                    aria-label="Add" 
                    className={classes.fab}
                    onClick={(e) => this.handleOnSubmit(e)}
                >
                    <AddIcon />
                </Fab>
            </form>
        )

    }
}

export default compose (
    withStyles(styles)
) (Form)