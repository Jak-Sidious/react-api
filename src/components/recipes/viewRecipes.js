import React, { Component } from 'react';
import Notifications from 'react-notify-toast';
import { Grid, Card, Icon, Button } from 'semantic-ui-react';
import axiosInstance from '../commonComponents/AxiosInstance';

import Navigation from '../Navbar/navbar';

class viewRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  }

  checkCategories() {
    const recipes = this.state.recipes;
    if (recipes < 1) {
      return 'You currently do not have any categories please create a few';
    }
    return '';
  }

  getRecipes() {
    const cats = this.props.match.params.category_id;
    const name = this.props;
    console.log(cats);
    console.log(name);
    axiosInstance

      .get(`/category/${cats}/recipes/list`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      .then(response => {
        const recipes = response.data;
        this.setState({ recipes: recipes });
        console.log(response);
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
        <Grid columns={4} divided>
          <Grid.Row>
            {this.state.recipes.map(recipes => (
              <Grid.Column>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      This is where the Category Name goes
                    </Card.Header>
                    <Card.Description>
                      <b>Recipe Name:</b> {recipes.recipie_name}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <b> Recipe Ingeredients: </b> {recipes.ingredients}
                  </Card.Content>

                  <Card.Content extra>
                    <Button
                      icon
                      color="green"
                      // onClick={() =>
                      //   this.setState({
                      //     showModal: true,
                      //     category_id: categories.category_id,
                      //     category_name: categories.category_name,
                      //     category_description:
                      //       categories.category_description
                      //   })
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
                      // onClick={event =>
                      //   this.deleteCategory(categories.category_id)
                      // }
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
        <ul>
          {this.state.recipes.map(recipes => <li>{recipes.recipie_name}</li>)}
        </ul>
      </div>
    );
  }
}

export default viewRecipes;
