import React , { Component } from 'react';
import axiosInstance from '../commonComponents/AxiosInstance';
import Notifications, { notify } from 'react-notify-toast';
// import CategoryCard from './category';
import Navigation from "../Navbar/navbar";
import { Grid, Card, Icon } from 'semantic-ui-react';

const CATEGORY_LIST_URL = '/category/list?per_page=10';

class viewCategories extends Component {
  constructor(props){
    super(props)

    this.state = {
      categories: [],
    };
  }

  checkCategories() {
    const categories = this.state.categories;
    if (categories < 1) {
      return('You currently do not have any categories please create a few');
    }
  }

  componentDidMount(){
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
    //Check your shit aint empty if categories aint emoty then for each categiry in categories
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
                      <a>
                        <Icon name='edit'/>
                        Edit
                      </a>
                      <a>
                        <Icon name='delete'/>
                        Delete
                      </a>
                      <a>
                        <Icon name='compose'/>
                        Create Recipe
                      </a>

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
