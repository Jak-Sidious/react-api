// component that renders the landing page
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import Notifications from 'react-notify-toast';
import Navigation from '../Navbar/navbar';

class Landing extends Component {
  render() {
    const { location: { pathname } } = this.props;
    console.log(pathname);
    return (
      <div className="mainBackground">
        <Navigation pathname={pathname} />
        <Notifications />

        <h1 className="Welcome">Welcome to yummy recipes</h1>
        <div className="introText">
          <Grid>
            <Grid.Row>
              <Grid.Column width={4} />
              <Grid.Column width={8}>
                <b>Food Categories and recipes for all Occasions:</b><br/><br/>
                Create, View, Edit and Delete Categories<br/>
                <br/>
                <b>After Which you can:</b> <br/> Create, View, Edit and Delete Recipes
                For your categories<br/>
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </div>
      </div>
    );
  }
}

export default Landing;
