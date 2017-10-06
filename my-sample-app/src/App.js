import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SelectField from './components/SelectField';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React with Select Field Component</h1>
  
        </header>
        
        <br/>
        <div>
          <span> Combo Box Example 1 </span>
          <SelectField options={[1,2,3,4]}/>
        </div>
                
        <br/>
        <div>
        <span> Combo Box Example 2 </span>
          <SelectField options={
          [{'Player' : 1, Id : 'One', name : 'Player A'} ,
           {'Player' : 2, Id : 'Two', name : 'Player B'},
           {'Player' : 3, Id : 'Three', name : 'Player C'},
           {'Player' : 4, Id : 'Four', name : 'Player D'},
          ]} fieldLabel = "name" fieldValue = "Player" selectedValue = {2} />
        </div>
        
        <br/>
        <div>
          <span> Combo Box Example 3 </span>
          <SelectField options={[1,2,3,4]} selectedValue = {3}/>
        </div>

        <br/>
      </div>
    );
  }
}

export default App;
