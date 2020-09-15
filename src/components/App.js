import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

import ShopProvider from '../context/ShopContext';
import Homepage from '../pages/HomePage';
import Productpage from '../pages/ProductPage';

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();
const engine = new Styletron();

function App() {
  return (
    <ShopProvider>
      <StyletronProvider value={engine} debug={debug} debugAfterHydration>
        <Router>
          <Switch>

            <Route path='/' exact>
              <Homepage />
            </Route>

            <Route path='/product/:id'>
              <Productpage />
            </Route>

          </Switch>
        </Router>
      </StyletronProvider>
    </ShopProvider>
  );
}

export default App;
