import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import Navigation from '../../components/Navbar/navbar';

Enzyme.configure({ adapter: new Adapter() });

describe('<Navigation />', () => {
  const component = mount(<MemoryRouter><Navigation /></MemoryRouter>)
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
  });
  it('should render a <Menu> tag', () => {
    expect(component.find('Menu').length).toBe(2);
  });

  it('should contain 3 Menu.Item', () => {
    const items = component.find('Menu.Item');
    expect(items).toHaveLength(0);
  })

});
