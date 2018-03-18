import React, { Component } from "react";
import { Input, Menu } from 'semantic-ui-react'


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
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item name='categories' active={activeItem === 'messages'} onClick={this.handleItemClick} />
        <Menu.Item name='Recipies' active={activeItem === 'friends'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
      </div>
    )
  }
}

export default Navigation;
