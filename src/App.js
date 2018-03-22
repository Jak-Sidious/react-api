//necesaary
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//components
import Login from './components/Login/login';
import Register from './components/Register/register';
import Landing from './components/Landing/landing';
import createCategory from './components/categories/createCategory';
import viewCategories from './components/categories/viewCategories';
import viewRecipies from './components/recipes/viewRecipes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route
              exact
              path="/category/:category_id/recipes/list"
              component={viewRecipies}
            />
            <Route exact path="/viewCat" component={viewCategories} />
            <Route exact path="/catCreate" component={createCategory} />
            <Route exact path="/landing" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Register} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
