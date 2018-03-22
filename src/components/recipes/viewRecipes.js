import React, { Component } from 'react';
import Notifications from 'react-notify-toast';
import { Grid, Card, Icon, Button } from 'semantic-ui-react';
import axiosInstance from '../commonComponents/AxiosInstance';

import Navigation from '../Navbar/navbar';

class viewRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      categoryId: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  }

  checkRecipes() {
    const recipes = this.state.recipes;
    if (recipes < 1) {
      return 'You currently do not have any Recipes please create a few';
    }
    return '';
  }

  deleteRecipe(id, id2) {
    axiosInstance
      .delete(`/category/${id}/recipes/${id2}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data.message);
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  getRecipes() {
    const cats = this.props.match.params.category_id;
    axiosInstance

      .get(`/category/${cats}/recipes/list`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      .then(response => {
        const recipes = response.data;
        this.setState({ recipes: recipes });
        this.setState({ categoryId: cats });
        console.log(response);
        console.log(this.state);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }

  componentDidMount() {
    this.getRecipes();
  }

  render() {
    const { location: { pathname } } = this.props;

    return (
      <div className="mainBackground">
        <Navigation pathname={pathname} />
        <Notifications />
        <br />
        <div>
          <h1 className="RecHeader">
            When Passed properly, the category name shall appear here
          </h1>
          <Grid columns={3} divided>
            <Grid.Row>
              {this.state.recipes.map(recipes => (
                <Grid.Column>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>
                        <b>Recipe Name:</b> {recipes.recipie_name}
                      </Card.Header>
                      <Card.Description>
                        <b> Recipe Ingeredients: </b> {recipes.ingredients}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Button
                        icon
                        color="green"
                        // onClick={event =>
                        //   this.deleteRecipe(recipes.recipie_id)
                        // }
                        className="Basic Modal"
                      >
                        <Icon name="edit" />
                        Edit
                      </Button>
                      <Button
                        icon
                        color="red"
                        floated="right"
                        onClick={() =>
                          this.deleteRecipe(
                            this.state.categoryId,
                            recipes.recipie_id
                          )
                        }
                      >
                        <Icon name="delete" />
                        Delete
                      </Button>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>

          {<h1> {this.checkRecipes()} </h1>}
        </div>
      </div>
    );
  }
}

export default viewRecipes;
