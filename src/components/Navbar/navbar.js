import React, { Component } from "react";
import { Input, Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';



class Navigation extends Component {
  state = {
    activeItem: 'home'
  }

  handleItemClick = (event, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu inverted>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
          as={ Link } to='/landing'/>
        <Menu inverted>
          <Dropdown
            item text='Categories'
            active={activeItem === 'Categories'}
            onClick={this.handleItemClick} >
            <Dropdown.Menu>
              <Dropdown.Item
                as={ Link } to='/catCreate'>CreateCategory</Dropdown.Item>
              <Dropdown.Item>View Categories</Dropdown.Item>
              <Dropdown.Item>Edit Categories</Dropdown.Item>
              <Dropdown.Item>Delete Categories</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
        <Menu inverted>
          <Dropdown
            item text='Recipes'
            active={activeItem === 'Recipes'}
            onClick={this.handleItemClick} >
            <Dropdown.Menu>
              <Dropdown.Item>Create Recipe</Dropdown.Item>
              <Dropdown.Item>View Recipes</Dropdown.Item>
              <Dropdown.Item>Edit Recipe</Dropdown.Item>
              <Dropdown.Item>Delete Recipe</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu inverted>
            <Dropdown
              item text='User'
              active={activeItem === 'User'}
              onClick={this.handleItemClick} >
              <Dropdown.Menu>
                <Dropdown.Item>View Details</Dropdown.Item>
                <Dropdown.Item>Change Password</Dropdown.Item>
                <Dropdown.Item>Logout</Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </Menu.Menu>
      </Menu>
      </div>
    )
  }
}

export default Navigation;
