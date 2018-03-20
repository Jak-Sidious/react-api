import React, { Component } from "react";
import { Input, Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';



class Navigation extends Component {
  state = {
    activeItem: 'home'
  }

  handleItemClick = (event, { name }) => {
    this.setState({ activeItem: name })
    console.log(name);
  }

  render() {
    const { activeItem } = this.state

    const { pathname } = this.props;

    // console.log("NAVBAR!!!!: ", this.props.location);

    return (
      <div>
        <Menu inverted>
          <Menu.Item
            name='home'
            active={pathname === '/landing'}
            onClick={this.handleItemClick}
            as={ Link } to='/landing'/>

          <Menu.Item
            name='Categories'
            active={pathname === '/viewCat' || '/catCreate'}>
            <Dropdown
              item text='Categories'>
              <Dropdown.Menu>
                <Dropdown.Item
                  name="Categories"
                  onClick={this.handleItemClick}
                  as={ Link } to='/catCreate'>CreateCategory</Dropdown.Item>
                <Dropdown.Item
                  name="Categories"
                  as={ Link } to='/viewCat'>View Categories</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>

          <Menu.Item>
            <Dropdown
              item text='Recipes'
              onClick={this.handleItemClick} >
              <Dropdown.Menu>
                <Dropdown.Item>Create Recipe</Dropdown.Item>
                <Dropdown.Item>View Recipes</Dropdown.Item>
                <Dropdown.Item>Edit Recipe</Dropdown.Item>
                <Dropdown.Item>Delete Recipe</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>

            <Menu.Menu position='right'>
              <Menu.Item>
                <Input icon='search' placeholder='Search...' />
              </Menu.Item>
              <Menu inverted>
                <Dropdown
                  item text='User'
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
