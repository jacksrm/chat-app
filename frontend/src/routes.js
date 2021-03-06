import React from "react";

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Chat from './pages/Chat';
import Login from './pages/Login';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/chat/:username" component={Chat} />
      </Switch>
    </BrowserRouter>
  )
}