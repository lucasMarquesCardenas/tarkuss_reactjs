import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import Login from './pages/Login';
import App from './pages/Dashboard/App';
import Register from './pages/Register';
import ProfileHome from './pages/ProfileClient/ProfileHome';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/index" component={App} />
            <Route path="/register" component={Register} />
            <Route path="/profile_client" component={ProfileHome} />
        </Switch>
    </ BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

