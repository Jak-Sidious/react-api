import React from "react";
import Navigation from "../Navbar/navbar";
import axios from 'axios';
import Categories from '../commonComponents/categoryCard';


const CATEGORY_LIST_URL = 'category/list';
const baseURL= 'http://localhost:5000/apiv1';
// const token = localStorage.getItem('token');
const headers = { Authorization:` Bearer ${localStorage.getItem('token')}` };

class viewCategories extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      categories: [],
    };
  }
  componentDidMount(){
    axios.get(`${baseURL}/${CATEGORY_LIST_URL}`, {headers}).then(
      response => {
        const categories = response.data;
        this.setState({ categories });

    })
  }

  render(){

    // const {categories} = this.state
    //
    //     let renderCategories = categories.map(category => {
    //         return (
    //         <Categories id={category.id} {...category}/>
    //     )
    // })

    return(

      <div>
        <Navigation/>
        {/* {renderCategories} */}
        <Categories/>
      </div>
    )
  }
}

export default viewCategories;
