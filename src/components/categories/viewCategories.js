import React , { Component } from 'react';
import axiosInstance from '../commonComponents/AxiosInstance';
import Notifications, { notify } from 'react-notify-toast';
import Navigation from "../Navbar/navbar";
import { Grid, Card, Icon, Button } from 'semantic-ui-react';
import ModalEditCat from '../commonComponents/editCategoryModal';
import ModalCreateRecipe from '../commonComponents/createRecipeModal';

const CATEGORY_LIST_URL = '/category/list?per_page=10';

class viewCategories extends Component {
  constructor(props){
    super(props)

    this.state = {
      categories: [],
      category_id: '',
      category_name: '',
      category_description: '',
      showModal: false,
      showModal1: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange = (event) =>{
    const { name, value } = event.target;
    this.setState({[name]: value});
    console.log(this.state);
  }

  checkCategories() {
    const categories = this.state.categories;
    if (categories < 1) {
      return('You currently do not have any categories please create a few');
    }
  }


  deleteCategory(id){
    console.log(id);
    axiosInstance
      .delete(`/category/${id}`,
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.message);
          window.location.reload();
          // call to react to reload the state
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  handleEdit(e) {
    e.preventDefault();

    const cat_id = this.state.category_id;

    const editedCategory ={
      category_name: this.state.category_name,
      category_description: this.state.category_description,
    }
    console.log(editedCategory);
    console.log(cat_id);
    axiosInstance
    .put(`/category/${this.state.category_id}`,
      editedCategory,
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data.message);
        window.location.reload();
      }
    })
    .catch((error) => {
      console.log(error.response);
    });
  }

  componentDidMount() {
    axiosInstance
      .get(`${CATEGORY_LIST_URL}`,
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
      ).then(response=>{
        const categories = response.data;
        // console.log(categories);
        this.setState({ categories: categories });
        console.log(this.state);
      })
      .catch((error) => {
        if (error.response){
          console.log(error.response);
        }
      });
  }

  render() {
    const { location: { pathname } } = this.props;
    return (
      <div className="mainBackground">
        <Navigation pathname={pathname}/>
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
          showModal1={this.state.showModal1}
          closeModal1={() => this.setState({ showModal1: false })}
          handleChange={() => this.handleChange}
          handleCreate={() => this.handleCreate}
          category_id={this.state.category_id}
        />
        <br/>
        <div >
            <Grid columns={3} divided>
              <Grid.Row>
                {this.state.categories.map(categories =>
                <Grid.Column>
                  <Card
                    fluid>
                    <Card.Content>
                      <Card.Header>
                        {categories.category_name}
                      </Card.Header>
                      <Card.Description>
                        {categories.category_description}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Button icon
                        color='green'
                        onClick={() => this.setState({
                           showModal: true,
                           category_id: categories.category_id,
                           category_name: categories.category_name,
                           category_description: categories.category_description
                        })}
                        className="Basic Modal">
                        <Icon name='edit' />
                        Edit
                      </Button>
                      <Button icon
                        color='red'
                        onClick={(event) => this.deleteCategory(categories.category_id)}>
                        <Icon name='delete' />
                        Delete
                      </Button>
                      <Button icon
                        color='blue'
                        onClick={(event) => this.setState({
                          showModal1: true,
                          category_id: categories.category_id,
                         })}
                        className="Create Modal">
                        <Icon name='compose' />
                        Create Recipe
                      </Button>
                  </Card.Content>
                  </Card>
                </Grid.Column>
              )}
              </Grid.Row>
            </Grid>

            {
              <h1> { this.checkCategories() } </h1>
            }

        </div>
      </div>
    )
  }

}

export default viewCategories;
