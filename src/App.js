import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
// import Nav from "./components/Nav/Nav"
import HomePage from "./pages/HomePage";

function App() {

    return (
        <Router>
            <div>
                {/* <header>
                    
                    <Nav username={username} />
                </header> */}

                <br></br>
                <Switch>
                    {/* <Route path="/login/">
                        <LoginPage />
                    </Route> */}

                    <Route exact path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </div>

        </Router>

    )
}

export default App;