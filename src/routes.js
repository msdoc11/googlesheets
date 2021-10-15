import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import App from './App'

import { language } from './setting'

export const Routing = () => {
    return (
        <Router>
            <Switch>
                {
                    language.map((v, i) => {
                        return (
                            <Route key={i} path={v.value + v.link}>
                                <App />
                            </Route>
                        )
                    })
                }
                <Redirect to={language[0].value + language[0].link}/> 
            </Switch>
        </Router>
    )
}