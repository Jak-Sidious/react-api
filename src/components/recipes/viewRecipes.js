import React , { Component } from 'react';
import axiosInstance from '../commonComponents/AxiosInstance';
import Notifications, { notify } from 'react-notify-toast';
import Navigation from "../Navbar/navbar";
import { Grid, Card, Icon, Button } from 'semantic-ui-react';

class viewRecipes extends Component{
  constructor(props){
    super(props);

    this.state ={
      recipes: [],
      category_id: '',
      recipeId: '',
      recipeName: '',
      ingredients: ''
    }
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange = (event) =>{
    const { name, value } = event.target;
    this.setState({[name]: value});
    console.log(this.state);
  }

  checkCategories() {
    const recipes = this.state.recipes;
    if (recipes < 1) {
      return('You currently do not have any categories please create a few');
    }
  }

  getRecipes() {
    axiosInstance
      .get(`/category${this.props.category_id}/recipes/list`,
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
      ).then(response=>{
        const recipes = response.data;
        // console.log(categories);
        this.setState({ recipes: recipes });
        console.log(this.state);
      })
      .catch((error) => {
        if (error.response){
          console.log(error.response);
        }
      });
  }

  componentDidMount(){
    this.getRecipes();
  }

  render(){
    return (
      <h1>This is the recipes page</h1>
    )
  }

}

export default viewRecipes;
