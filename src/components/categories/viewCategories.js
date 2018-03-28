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
      page: 0,
      pages: 0,
      perPage: 0,
      total: 0,
      search: '',
      categoryId: '',
      category_name: '',
      category_description: '',
      showModal: false,
      showModal1: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.redirectRecipes = this.redirectRecipes.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
        console.log(response.data.message);
        window.location.reload();
      })
      .catch(error => {
        if (error.response) {
          notify.show(`${error.response.data.message}`)
        }
      });
  }

  // Function to route user to the recipes page
  viewRec(id, name) {
    axiosInstance
      .get(`/category/${id}/recipes/list`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        console.log(response.data.message);
        window.localStorage.setItem('category', name)
        this.props.history.push(`/category/${id}/recipes/list`);
        notify.show(`${response.status.data.message}`)
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
        console.log(response.data.message);
        window.location.reload();
        notify.show(`${response.status.data.message}`);
      })
      .catch(error => {
        if (error.response) {
          notify.show(`${error.response.data.message}`)
        }
      });
  }

  // Function to handle movement to the next page
  nextPage() {
    // event.preventDefault();
    if (this.state.page === this.state.pages) {
      return 0;
    } else {
      const newPage = this.state.page + 1;
      // console.log(newPage);
      axiosInstance
        .get(`${CATEGORY_LIST_URL}?page=${newPage}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
          const categories = response.data.items;
          this.setState({ categories: categories });
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
          }
        });
    }
  }

  // Function to handle movement to the previous page
  previousPage() {
    if (this.state.page === 0) {
      return 0;
    } else {
      const newPage = this.state.page - 1;
      axiosInstance
        .get(`${CATEGORY_LIST_URL}?page=${newPage}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
          const categories = response.data.items;
          this.setState({ categories: categories });
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
    .get(`${CATEGORY_LIST_URL}?q=${searchParam}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      console.log(response);
      const categories = response.data.items;
      this.setState({ categories: categories});
    })
    .catch(error => {
      if (error.response) {
        notify.show(`${error.response.data.message}`)
      }
    });
  }


  componentDidMount() {
    axiosInstance
      .get(`${CATEGORY_LIST_URL}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        console.log(response.data);
        const categories = response.data.items;
        console.log(categories);
        this.setState({ categories: categories });
        this.setState({ page: response.data.page });
        this.setState({ pages: response.data.pages });
        this.setState({ perPage: response.data.per_page });
        this.setState({ total: response.data.total });
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
          category_name={this.state.category_name}
        />
        <br />
        <div>
          <Grid container columns={3}>
            <form onSubmit={this.handleSearch}>
              <input className="catSearch"
                type="search"
                name="search"
                placeholder="Search.."
                onChange={this.handleChange}
              />
              </form>
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
                        // title={this.categories.category_id}
                        onClick={() => this.viewRec(categories.category_id, categories.category_name)}
                      >
                        <Icon name="find" />
                        View Recipes
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

          {<h1> {this.checkCategories()} </h1>}
        </div>
      </div>
    );
  }
}

export default ViewCategories;
