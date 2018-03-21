import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import axiosInstance from '../commonComponents/AxiosInstance';
import  notify  from 'react-notify-toast';


class ModalEditCat extends Component{
  constructor(props) {
    super(props);
    this.state = {
      category_id: '',
      showModal: false
    }
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  render(){
      return (
        <Modal closeIcon
          onClose={this.props.closeModal}
          open={this.props.showModal}>
          <Modal.Header>Create Category</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Input
                label='Category name'
                name='category_name'
                value={this.props.name}
                onChange={this.props.handleChange}
              />
              <Form.TextArea
                label='Category description'
                name='category_description'
                value={this.props.desc}
                onChange={this.props.handleChange}
              />
              <Button
                onClick={this.props.handleEdit}
                color='blue'>Save</Button>
            </Form>
          </Modal.Content>
        </Modal>
      )
    }
}

export default ModalEditCat;
