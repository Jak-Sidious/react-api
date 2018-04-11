// Component used to view the recipes a user has
import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import { Grid, Card, Icon, Button } from 'semantic-ui-react';
import axiosInstance from '../commonComponents/AxiosInstance';

import Navigation from '../Navbar/navbar';
import ModalEditRec from '../commonComponents/editRecipeModal';
import ModalCreateRecipe from '../commonComponents/createRecipeModal';

class ViewRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      page: 0,
      pages: 0,
      perPage: 0,
      total: 0,
      search: '',
      categoryId: '',
      recipeId: '',
      recipeName: '',
      recipeDesc: '',
      showModal: false,
      showModal1: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getRecipes = this.getRecipes.bind(this);
  }

  // Function/event handler for changes to the forms
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Function that caters to the deleting of recipes
  deleteRecipe(id, id2) {
    axiosInstance
      .delete(`/category/${id}/recipes/${id2}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        console.log(response.data);
        notify.show(`${response.data.message}`);
        this.getRecipes();
      })
      .catch(error => {
        if (error.response) {
          notify.show(`${error.response.data.message}`);
          this.getRecipes();
        }
      });
  }

  // function that caters to the handling of edits to recipes
  handleEdit(event) {
    event.preventDefault();
    const editedRecipe = {
      recipie_name: this.state.recipeName,
      ingredients: this.state.recipeDesc
    };
    axiosInstance
      .put(
        `/category/${this.state.categoryId}/recipes/${this.state.recipeId}`,
        editedRecipe,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      .then(response => {
        window.location.assign(`/category/${this.state.categoryId}/recipes/list`);
        notify.show(`${response.status.data.message}`);
      })
      .catch(error => {
        if (error.response) {
          notify.show(`${error.response.data.message}`);
          window.location.assign(`/category/${this.state.categoryId}/recipes/$list`);
        }
      });
  }

  // function to get all recipes assigned to a particular category
  getRecipes() {
    var cats = this.props.match.params.category_id;
    axiosInstance
      .get(`/category/${cats}/recipes/list`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      .then(response => {
        const recipes = response.data.items;
        console.log(recipes);
        this.setState({ recipes: recipes });
        this.setState({ categoryId: cats });
        this.setState({ page: response.data.page });
        this.setState({ pages: response.data.pages });
        this.setState({ perPage: response.data.per_page });
        this.setState({ total: response.data.total });
      })
      .catch(error => {
        if (error.response) {
          notify.show(`${error.response.data.message}`);
          if (error.response.status === 404) {
            this.setState({ recipes: [], });
          }

        }
      });
  }

  nextPage() {
    // event.preventDefault();
    if (this.state.page === this.state.pages) {
      return 0;
    } else {
      const newPage = this.state.page + 1;
      // console.log(newPage);
      axiosInstance
        .get(
          `/category/${this.state.categoryId}/recipes/list?page=${newPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        .then(response => {
          console.log(response.data);
          const recipes = response.data.items;
          this.setState({ recipes: recipes });
          this.setState({ page: response.data.page });
          this.setState({ pages: response.data.pages });
          this.setState({ perPage: response.data.per_page });
          this.setState({ total: response.data.total });
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
          }
        });
    }
  }

  previousPage() {
    if (this.state.page === 1) {
      return 0;
    } else {
      console.log(this.state.page);
      const newPage = this.state.page - 1;
      console.log(newPage);
      axiosInstance
        .get(
          `/category/${this.state.categoryId}/recipes/list?page=${newPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        .then(response => {
          const recipes = response.data.items;
          this.setState({ recipes: recipes });
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
          }
        });
    }
  }

  handleSearch(event) {
    event.preventDefault();
    const searchParam = this.state.search;
    axiosInstance
      .get(`/category/${this.state.categoryId}/recipes/list?q=${searchParam}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        console.log(response);
        const recipes = response.data.items;
        this.setState({ recipes: recipes });
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
    const recs = this.state.recipes.length;
    const number = this.props.match.params.category_id;
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
          contain={this.state.recipeDesc}
        />
        <ModalCreateRecipe
          redirectRecipes={this.redirectRecipes}
          showModal1={this.state.showModal1}
          closeModal1={() => this.setState({ showModal1: false })}
          handleChange={() => this.handleChange}
          handleCreate={() => this.handleCreate}
          category_id={this.state.category_id}
          category_name={this.state.category_name}
          closeIcon
        />
        <br />
        { recs ? (
        <div>
          <h1 className="RecHeader">
            {window.localStorage.getItem('category')} {this.props.title}
          </h1>
          <br />
          <Grid columns='equal'>
            <Grid.Column width={7}></Grid.Column>
            <Grid.Column width={8}>
              <Button
                id="creator"
                color="green"
                onClick={() =>
                  this.setState({
                    category_id: number,
                    showModal1:true
                  })
                  }
                >
                  Create a Recipe
                </Button>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
          <Grid container columns={3}>
            <form onSubmit={this.handleSearch}>
              <input
                className="catSearch"
                type="search"
                name="search"
                placeholder="Search.."
                onChange={this.handleChange}
              />
            </form>
            <Grid.Row>
              {this.state.recipes.map(recipes => (
                <Grid.Column>
                  <br />
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
                        id="editRec"
                        icon
                        color="green"
                        onClick={() =>
                          this.setState({
                            showModal: true,
                            categoryId: this.state.categoryId,
                            recipeId: recipes.recipie_id,
                            recipeName: recipes.recipie_name,
                            recipeDesc: recipes.ingredients
                          })
                        }
                        className="Basic Modal"
                      >
                        <Icon name="edit" />
                        Edit
                      </Button>
                      <Button
                        id="deleteRec"
                        icon
                        color="red"
                        floated="right"
                        onClick={() =>
                          this.deleteRecipe(
                            recipes.category_id,
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
            <Button
              className="left floated"
              animated
              onClick={() => this.previousPage()}
            >
              <Button.Content visible>Previous</Button.Content>
              <Button.Content hidden>
                <Icon name="left arrow" />
              </Button.Content>
            </Button>
            <Button
              className="right floated"
              animated
              onClick={() => this.nextPage()}
            >
              <Button.Content visible>Next</Button.Content>
              <Button.Content hidden>
                <Icon name="right arrow" />
              </Button.Content>
            </Button>
          </Grid>
        </div>
      ) : (
        <div>
          <h1> This User has no Recipes, do create some</h1>
          <Grid columns='equal'>
            <Grid.Column width={7}></Grid.Column>
            <Grid.Column width={8}>
              <Button
                id="creator"
                color="green"
                onClick={() =>
                  this.setState({
                    category_id: number,
                    showModal1:true
                  })
                  }
                >
                  Create a Recipe
                </Button>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </div>
      )}
      </div>
    );
  }
}

export default ViewRecipes;
