// Component used to view the recipes a user has
import React, { Component } from 'react';
import Notifications from 'react-notify-toast';
import { Grid, Card, Icon, Button } from 'semantic-ui-react';
import axiosInstance from '../commonComponents/AxiosInstance';

import Navigation from '../Navbar/navbar';
import ModalEditRec from '../commonComponents/editRecipeModal';

class ViewRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      categoryId: '',
      recipeId: '',
      recipeName: '',
      ingrain: '',
      showModal: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  // Function/event handler for changes to the forms
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  }

  // Check to see if the recipes array contains data
  checkRecipes() {
    const recipes = this.state.recipes;
    if (recipes < 1) {
      return 'You currently do not have any Recipes please create a few';
    }
    return '';
  }

  // Function that caters to the deleting of recipes
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

  // function that caters to the handling of edits to recipes
  handleEdit(e) {
    e.preventDefault();
    const editedRecipe = {
      recipie_name: this.state.recipeName,
      ingredients: this.state.ingrain
    };
    console.log(editedRecipe);
    console.log(this.state.categoryId);
    console.log(this.state.recipeId);
    axiosInstance
      .put(
        `/category/${this.state.categoryId}/recipes/${this.state.recipeId}`,
        editedRecipe,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
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

  // function to get all recipes assigned to a particular category
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

  // function that runs as soon as the component is mounted
  componentDidMount() {
    this.getRecipes();
  }

  render() {
    const { location: { pathname } } = this.props;

    return (
      <div className="mainBackground">
        <Navigation pathname={pathname} />
        <Notifications />
        <ModalEditRec
          showModal={this.state.showModal}
          closeModal={() => this.setState({ showModal: false })}
          handleChange={this.handleChange}
          handleEdit={this.handleEdit}
          Id={this.state.categoryID}
          recId={this.state.recipeId}
          name={this.state.recipeName}
          contentz={this.state.ingrain}
        />
        <br />
        <div>
          <h1 className="RecHeader">
            The recipe header goes here
          </h1>
          <Grid container columns={3}>
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
                        onClick={() =>
                          this.setState({
                            showModal: true,
                            categoryId: this.state.categoryId,
                            recipeId: recipes.recipie_id,
                            recipeName: recipes.recipie_name,
                            ingrid: recipes.ingredients
                          })
                        }
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

export default ViewRecipes;
