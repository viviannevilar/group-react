import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useLocation } from "react-router-dom"
import "./App.css";
import EditProfilePage from "./pages/EditProfile/Editprofile";
import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import LoginPage from "./pages/LoginPage/LoginPage";
import LogoutPage from "./components/LogoutForm/LogoutForm";
import SignUp from "./pages/SignUp/SignUp";
import Nav from "./components/Nav/Nav";
import NewCollection from './pages/NewCollection/NewCollection';
import CollectionDetailPage from "./pages/CollectionDetailPage/CollectionDetailPage";
import CollectionsPage from "./pages/CollectionsPage/CollectionsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ItemEditPage from "./pages/ItemEditPage/ItemEditPage";
import CollectionSortPage from "./pages/CollectionSortPage/CollectionSortPage";
import SortableComponent from "./pages/CollectionSortPage/SortPage"
import EditCollectionPage from "./pages/EditCollectionPage/EditCollectionPage";


function App() {



    return (
        <Router>
            <div>

               <Nav /> 
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
                    <Route exact path="/logout">
                        <LogoutPage />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp />
                    </Route>

                    <Route exact path="/edituserdetails">
                        <EditProfilePage />
                        {/* <EditProfileForm /> */}
                    </Route>

                    <Route exact path="/newcollection">
                        <NewCollection />
                    </Route>

                    <Route exact path="/editcollection/:id">
                        <EditCollectionPage />
                    </Route>

                    <Route exact path="/collection/:id">
                        <CollectionDetailPage />
                    </Route>

                    <Route exact path="/item-edit/:id/:listid/">
                        <ItemEditPage />
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

                    <Route exact path="/collection/sort/:id/">
                        {/* <SortableComponent /> */}
                        <CollectionSortPage />
                    </Route>

                    <Route exact path="/collection/:id/manual-sort/">
                        <SortableComponent />
                        {/* <CollectionSortPage /> */}
                    </Route>


                    <Route path="*" component={NotFoundPage} />

                </Switch>
            </div>

        </Router>

    )
}

export default App;