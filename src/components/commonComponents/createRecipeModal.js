import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import axiosInstance from '../commonComponents/AxiosInstance';
import  notify  from 'react-notify-toast';


class ModalCreateRecipe extends Component{
  constructor(props) {
    super(props);
    this.state = {
      recipie_name: '',
      ingredients: '',
      category_id: '',
      showModal1: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }


  handleChange = (event) =>{
    const { name, value } = event.target;
    this.setState({[name]: value});
    console.log(this.state);
  }

  handleCreate(e) {
    e.preventDefault();

    const cat_id = this.props.category_id;

    const editedCategory ={
      recipie_name: this.state.category_name,
      ingredients: this.state.category_description,
    }
    console.log(editedCategory);
    console.log(cat_id);
    // axiosInstance
    // .put(`/category/${this.props.category_id}`,
    //   editedCategory,
    //   {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    // .then((response) => {
    //   if (response.status === 200) {
    //     console.log(response.data.message);
    //     window.location.reload();
    //   }
    // })
    // .catch((error) => {
    //   console.log(error.response.data.message);
    // });
}


  closeModal1 = () => {
    this.setState({ showModal1: false })
  }

  render(){
      return (
        <Modal closeIcon
          onClose={this.props.closeModal1}
          open={this.props.showModal1}>
          <Modal.Header>Create Recipe</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Input
                label='Recipe Name'
                name='recipie_name'
                onChange={this.handleChange}
              />
              <Form.TextArea
                label='Recipe ingredients'
                name='ingredients'
                onChange={this.handleChange}
              />
              <Button
                onClick={this.handleCreate}
                color='blue'
                >Create</Button>
            </Form>
          </Modal.Content>
        </Modal>
      )
    }
}

export default ModalCreateRecipe;
