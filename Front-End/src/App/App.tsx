import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { navigation } from "./Navigation";

export class App extends React.Component {
  render(): JSX.Element {
    return (
      <BrowserRouter>
        <div>
          {navigation.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
        </div>
      </BrowserRouter>
    );
  }
}
