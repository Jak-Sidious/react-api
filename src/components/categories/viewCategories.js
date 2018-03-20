import React , { Component } from 'react';
import axiosInstance from '../commonComponents/AxiosInstance';
import Notifications, { notify } from 'react-notify-toast';
import Navigation from "../Navbar/navbar";
import { Grid, Card, Icon, Button } from 'semantic-ui-react';

const CATEGORY_LIST_URL = '/category/list?per_page=10';

class viewCategories extends Component {
  constructor(props){
    super(props)

    this.state = {
      categories: [],
    };
    this.editCategory = this.editCategory.bind(this);
  }

  checkCategories() {
    const categories = this.state.categories;
    if (categories < 1) {
      return('You currently do not have any categories please create a few');
    }
  }

  editCategory(id) {
    console.log(id);
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
    return (
      <div className="mainBackground">
        <Navigation/>
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
                        onClick={(event) => this.editCategory(categories.category_id)}
                        className="Basic Modal">
                        <Icon name='edit' />
                        Edit
                      </Button>
                      <Button icon
                        color='red'
                        onClick={(event) => this.editCategory(categories.category_id)}>
                        <Icon name='delete' />
                        Delete
                      </Button>
                      <Button icon
                        color='blue'
                        onClick={(event) => this.editCategory(categories.category_id)}>
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
