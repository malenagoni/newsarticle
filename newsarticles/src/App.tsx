import React from 'react';
import { Route, Switch} from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';

function App() {
  return (
    <div className="App">
    <Switch> 

    <Route exact path='/' component={Layout} />
    </Switch> 
    </div>
  );
}

export default App;
