import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUp from "./pages/SignUp/SignUp";
import CollectionDetailPage from "./pages/CollectionDetailPage/CollectionDetailPage";
import CollectionsPage from "./pages/CollectionsPage/CollectionsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SharedCollection from "./pages/SharedCollection/SharedCollection";

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
                    <Route exact path="/aboutus">
                        <AboutUs />
                    </Route>
                    <Route exact path="/contactus">
                        <ContactUs />
                    </Route>
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp />
                    </Route>

                    <Route exact path="/collection/:id">
                        <CollectionDetailPage />
                    </Route>

                    <Route exact path="/collections/">
                        <CollectionsPage />
                    </Route>
                    <Route exact path="/collections-archive/">
                        <CollectionsPage />
                    </Route>
                    <Route exact path="/collection/shared/:id/:code/">
                        <CollectionDetailPage />
                    </Route>
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </div>

        </Router>

    )
}

export default App;