// Component that contains the navabar to be used throught the application
import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'home'
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  // Handles the clicking of various items
  handleItemClick(event, { name }) {
    this.setState({ activeItem: name });
    console.log(name);
  }

  render() {
    // const { activeItem } = this.state

    const { pathname } = this.props;
    const user = window.localStorage.getItem('user');
    return (
      <div>
        <Menu inverted size="large">
          <Menu.Item
            name="home"
            active={pathname === '/landing'}
            onClick={this.handleItemClick}
            as={Link}
            to="/landing"
          />

          <Menu.Item name="Categories">
            {/* // active={ pathname === '/viewCat' || '/catCreate' }> */}
            <Dropdown item text="Categories">
              <Dropdown.Menu>
                <Dropdown.Item
                  name="Categories"
                  onClick={this.handleItemClick}
                  active={pathname === '/catCreate'}
                  as={Link}
                  to="/catCreate"
                >
                  CreateCategory
                </Dropdown.Item>
                <Dropdown.Item
                  name="Categories"
                  active={pathname === '/viewCat'}
                  as={Link}
                  to="/viewCat"
                >
                  View Categories
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>

          <Menu.Item>
            <Dropdown item text="Recipes" onClick={this.handleItemClick}>
              <Dropdown.Menu>
                <Dropdown.Item>Create Recipe</Dropdown.Item>
                <Dropdown.Item>View Recipes</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu inverted>
              <Dropdown item text={user} onClick={this.handleItemClick}>
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
    );
  }
}

export default Navigation;
