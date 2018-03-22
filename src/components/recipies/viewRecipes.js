import React , { Component } from 'react';
import axiosInstance from '../commonComponents/AxiosInstance';
import Notifications, { notify } from 'react-notify-toast';
import Navigation from "../Navbar/navbar";
import { Grid, Card, Icon, Button } from 'semantic-ui-react';

class viewRecipies extends Component{
  constructor(props);
    super(props);

    this.state ={
      recipes: [],
      category_id: '',
      recipeId: '',
      recipeName: '',
      ingredients: ''
    }
}
