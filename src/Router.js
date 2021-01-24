import React from "react";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
//HashRouter
import {HashRouter , Route, Switch } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginScreen from "./views/LoginScreen";
import RegisterScreen from "./views/RegisterScreen";
import CategoryScreen from "./views/CategoryScreen";
import SubCategoryScreen from "./views/SubCategoryScreen";
import ServiceScreen from "./views/ServiceScreen";
import ProfileScreen from "./views/ProfileScreen";
import SettingsScreen from "./views/SettingsScreen";
import EditServiceScreen from "./views/EditServiceScreen";
import CreateServiceScreen from "./views/CreateServiceScreen";
import { Checkout } from "./components/Checkout";
import testHash from "./views/testHash";
import UploadToFireBase from "./components/UploadToFireBase";

//SendEmail
const Router = () => (
  <HashRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/service/:serviceName" exact component={ServiceScreen} />
      {/* <Route path="/message/:id" exact component={MessageScreen} /> */}
      <Route path="/edit/:serviceName" component={EditServiceScreen} />
      <Route
        path="/categories/:categoryName"
        exact
        component={CategoryScreen}
      />
      <Route
        path="/:categoryName/:subcategoryName"
        exact
        component={SubCategoryScreen}
      />
      {/* <UploadToFireBase> */}
      <Route  exact  path="/fi"component={UploadToFireBase} />
      <Route  exact  path="/profile"component={ProfileScreen} />
      <Route exact path="/login"  component={LoginScreen} />
      <Route exact path="/register"  component={RegisterScreen} />
      <Route  exact path="/settings" component={SettingsScreen} />
      <Route exact  path="/create" component={CreateServiceScreen} />
    </Switch>
  </HashRouter>
);

export default Router;
