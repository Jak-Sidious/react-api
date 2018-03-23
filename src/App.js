// necesaary
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// components
import { Protected } from "./components/commonComponents/Protected";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import Landing from "./components/Landing/landing";
import CreateCategory from "./components/categories/createCategory";
import ViewCategories from "./components/categories/ViewCategories";
import viewRecipies from "./components/recipes/viewRecipes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Protected
              exact
              path="/category/:category_id/recipes/list"
              component={viewRecipies}
            />
            <Protected exact path="/viewCat" component={ViewCategories} />
            <Protected exact path="/catCreate" component={CreateCategory} />
            <Protected exact path="/landing" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Register} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
