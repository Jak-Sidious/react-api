//necesaary
import React, { Component } from 'react';
import { BrowserRouter ,Route } from 'react-router-dom';

//components
import Login from './components/Login/login';
import Register from './components/Register/register';
import Landing from './components/Landing/landing';
import viewCategories from './components/categories/viewCategories';
// import EnsureLoggedIn from './components/auth/loggedIn';

// External import
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {

  render() {
    return (
      <div className="App">
          <BrowserRouter>
            <div>
              <Route exact path="/viewcategories" component={viewCategories} />
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
