import React, { Component } from 'react';
import Notifications from 'react-notify-toast';
import { Grid, Card, Icon, Button } from 'semantic-ui-react';
import axiosInstance from '../commonComponents/AxiosInstance';
import Navigation from '../Navbar/navbar';
import ModalEditCat from '../commonComponents/editCategoryModal';
import ModalCreateRecipe from '../commonComponents/createRecipeModal';

const CATEGORY_LIST_URL = '/category/list'; // Url for the creation of categories

class ViewCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      page: [],
      categoryId: '',
      category_name: '',
      category_description: '',
      showModal: false,
      showModal1: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.redirectRecipes = this.redirectRecipes.bind(this);
  }

  // function to redirect to the create recipes page
  redirectRecipes(categoryId) {
    this.props.history.push(`/category/${categoryId}/recipes/create`);
    console.log(categoryId);
  }

  // Event handler for changes made to the form
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  }

  // Function to check whether the categories array has content or not
  checkCategories() {
    const categories = this.state.categories;
    if (categories < 1) {
      return 'You currently do not have any categories please create a few';
    }
    return '';
  }

  // Function to delete category
  deleteCategory(id) {
    console.log(id);
    axiosInstance
      .delete(`/category/${id}`, {
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

  // Function to route user to the recipes page
  viewRec(id) {
    axiosInstance
      .get(`/category/${id}/recipes/list`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data.message);
          this.props.history.push(`/category/${id}/recipes/list`);
        }
      });
  }

  // Function that handles the editing of category information
  handleEdit(event) {
    event.preventDefault();
    const editedCategory = {
      category_name: this.state.category_name,
      category_description: this.state.category_description
    };
    console.log(editedCategory);
    axiosInstance
      .put(`/category/${this.state.category_id}`, editedCategory, {
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

  componentDidMount() {
    axiosInstance
      .get(`${CATEGORY_LIST_URL}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        console.log(response.data.items);
        const categories = response.data.items;
        // console
        console.log(categories);
        this.setState({ categories: categories });
        console.log(this.state);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }

  render() {
    const { location: { pathname } } = this.props;
    // const max = this.state.categories.length;
    return (
      <div className="mainBackground">
        <Navigation pathname={pathname} />
        <Notifications />
        <ModalEditCat
          showModal={this.state.showModal}
          closeModal={() => this.setState({ showModal: false })}
          handleChange={this.handleChange}
          handleEdit={this.handleEdit}
          category_id={this.state.category_id}
          name={this.state.category_name}
          desc={this.state.category_description}
        />
        <ModalCreateRecipe
          redirectRecipes={this.redirectRecipes}
          showModal1={this.state.showModal1}
          closeModal1={() => this.setState({ showModal1: false })}
          handleChange={() => this.handleChange}
          handleCreate={() => this.handleCreate}
          category_id={this.state.category_id}
        />
        <br />
        <div>
          <Grid container columns={3}>
            <Grid.Row>
              {this.state.categories.map(categories => (
                <Grid.Column>
                  <br />
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>{categories.category_name}</Card.Header>
                      <Card.Description>
                        {categories.category_description}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Button
                        icon
                        color="green"
                        onClick={() =>
                          this.setState({
                            showModal: true,
                            category_id: categories.category_id,
                            category_name: categories.category_name,
                            category_description:
                              categories.category_description
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
                        onClick={() =>
                          this.deleteCategory(categories.category_id)
                        }
                      >
                        <Icon name="delete" />
                        Delete
                      </Button>
                      <Button
                        icon
                        color="blue"
                        onClick={() =>
                          this.setState({
                            category_name: categories.category_name,
                            showModal1: true,
                            category_id: categories.category_id
                          })
                        }
                        className="Create Modal"
                      >
                        <Icon name="compose" />
                        Create Recipe
                      </Button>
                      <Button
                        icon
                        color="grey"
                        onClick={() => this.viewRec(categories.category_id)}
                      >
                        <Icon name="find" />
                        View Recipes
                      </Button>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
          {<h1> {this.checkCategories()} </h1>}
        </div>
      </div>
    );
  }
}

export default ViewCategories;
