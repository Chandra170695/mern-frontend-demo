import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import CharacterList from './components/CharacterList';
import './styles/styles.css';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/characters" component={CharacterList} />
          <Route exact path="/reset-password/:token" component={ResetPassword} />
          
          <Route path="/forgot-password" component={ForgotPassword} />
          <Redirect to="/signin" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
