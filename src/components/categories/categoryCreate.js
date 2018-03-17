import React from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:5000/apiv1/';
const REGISTRATION_URL = 'category/create';
class createCategory extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      category: {
        category_name: '',
        category_description: ''
      }
    };
  }

  handleChange









}
