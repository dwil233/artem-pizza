import React from 'react'
import { Route, Switch } from 'react-router'
import {ProductCreationPage} from './ProductCreationPage';

export function App() {
  return <>
    <Switch>
      <Route exact path="/">
        <ProductCreationPage/>
      </Route>
    </Switch>
  </>
}
