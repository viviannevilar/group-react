import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from 'react-helmet'
import "./App.css";

////// Components
import Nav from "./components/Nav/Nav";

import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";

import LoginPage from "./pages/LoginPage/LoginPage";
import LogoutPage from "./components/LogoutForm/LogoutForm";
import SignUp from "./pages/SignUp/SignUp";

import EditProfilePage from "./pages/Editprofile/EditProfile";
import NewCollection from './pages/NewCollection/NewCollection';
import ItemEditPage from "./pages/ItemEditPage/ItemEditPage";
import EditCollectionPage from "./pages/EditCollectionPage/EditCollectionPage";

import CollectionDetailPage from "./pages/CollectionDetailPage/CollectionDetailPage";
import CollectionsPage from "./pages/CollectionsPage/CollectionsPage";
import SortableComponent from "./pages/CollectionSortPage/SortPage"

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

// not used
// import Loader from "./components/Loader/Loader";
// import CollectionSortPage from "./pages/CollectionSortPage/CollectionSortPage";


function App() {

  const TITLE = 'ComparaList: Smart Shopping'

  return (
    <Router>

      <Helmet>
        <title>{ TITLE }</title>
      </Helmet>

      <Nav /> 
      <br></br>

      <Switch>

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

        <Route exact path="/collection/s/:id/:code/">
          <CollectionDetailPage />
        </Route>

        {/* <Route exact path="/collection/sort/:id/">
          <CollectionSortPage />
        </Route> */}

        <Route exact path="/collection/:id/manual-sort/">
          <SortableComponent />
        </Route>

        {/* <Route exact path="/loader/">
          <Loader />
        </Route> */}

        <Route path="*" component={NotFoundPage} />

      </Switch>

      {/* <Footer /> */}
    </Router>

  )
}

export default App;