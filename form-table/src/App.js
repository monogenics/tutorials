import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

import FileUpload from './FileUpload'
import DataTable from './DataTable'
import Word2Vec from './Word2Vec';
import ModelSelector from './ModelSelector'
import getAllPretrainedInfo from './apis/getAllPretrainedInfo'

class App extends Component {
  
  state = {
    data: [],
    uploadData: {},
    fields: {},
    options:{},
    w2vEngines: {},
    checkedw2v: false,

  }

  handleUploadData = (hdata) => {
    console.log("handleUploadData", hdata)
    this.setState({uploadData: hdata})
  }

  handleNumberOfEngines = (hdata) => {
    const parameters = (hdata.checkedw2v === true) 
      ? {load_all: 'True'}
      : {load_all: 'False'}

    console.log("handleNumberOfEngines:", hdata)
    this.setState({checkedw2v:hdata.checkedw2v})

    

    console.log("handleNumberOfEngines-->parameters:", parameters)

    this.invokeGetAllPretrainedInfo(parameters)

  }

  handleModelSelector = (hdata) => {
    const key=Object.keys(hdata)[0]
    const value=Object.values(hdata)[0]

    this.setState({
      options: 
      {...this.state.options, 
      [key]: value}
    })
  }

  handleFormOnSubmit = fields => {
    this.setState({fields})
    console.log("App.js --> handleFormSubmit:", fields)
  }

  async invokeGetAllPretrainedInfo(parameters){
    const options = await getAllPretrainedInfo(parameters)
    const w2vEngines =  Object.assign({}, options)

    this.setState({options},
      console.log("API CALL ", options)
    )
    this.setState({w2vEngines})
  }

  componentDidMount(){
    const parameters={load_all: 'False'}
    this.invokeGetAllPretrainedInfo(parameters)
  }

  render() {
   console.log("render->state:", this.state)
   
    return (
      <Paper>
        <CssBaseline />

          <ModelSelector 
            optionKeys = {this.state.options}
            w2vEngines = {this.state.w2vEngines}
            checkedw2v = {this.state.checkedw2v}
            models = {this.handleModelSelector}
            allEngines = {this.handleNumberOfEngines}
          />

        <Grid>
          <Word2Vec />
        </Grid>
      </Paper>


      /* 
        <Grid container justify = "center">

          <FileUpload title="Upload" fileData={this.handleUploadData}/>

          {(Object.entries(this.state.uploadData).length !== 0 ) 
              ? <DataTable title="Uploaded File Table" parsedData={this.state.uploadData}/> 
              : <div><hr /></div>}

        </Grid>

      <div className="App">

        <Form onSubmit={submission => 
          this.setState({
            data: [...this.state.data, submission]
          })}
        />

        <SimpleTable
          data={this.state.data}
          header={[
            {
              name: "First name",
              prop: "firstName"
            },
            {
              name: "Last name",
              prop: "lastName"
            },
            {
              name: "Username",
              prop: "username"
            },
            {
              name: "Email ",
              prop: "email"
            },
            {
              name: "Password",
              prop: "password"
            },
            
          ]}
        />
      
      </div> */

    );
  }
}

export default App;
