import React , { Component } from 'react';
import axiosInstance from '../commonComponents/AxiosInstance';
import Notifications, { notify } from 'react-notify-toast';
import CategoryCard from './category';
import Navigation from "../Navbar/navbar";

const CATEGORY_LIST_URL = '/category/list?per_page=10';

class viewCategories extends Component {
  constructor(props){
    super(props)

    this.state = {
      categories: [],
    };
  }

  componentDidMount(){
    axiosInstance
    .get(`${CATEGORY_LIST_URL}`,
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
    ).then(response=>{
      const categories = response.data;
      this.setState({categories})
      console.log(this.state);
    })
    //Check your shit aint empty if categories aint emoty then for each categiry in categories
  }


  render() {
    return (
      <ul>
        {this.state.categories.map(categories => <li>{" Category id:  " +categories.category_id}
          {"Category name: " +categories.category_name} {"Category description: "+categories.category_description}</li>)}
      </ul>
    )
  }

}

export default viewCategories;
