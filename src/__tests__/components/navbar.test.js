import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import Navigation from '../../components/Navbar/navbar';

Enzyme.configure({ adapter: new Adapter() });

describe('<Navigation />', () => {
  const component = mount(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );
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
  it('should render properly', () => {
    const wrapper = shallow(<Navigation />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should contain 3 Menu.Item', () => {
    const items = component.find('Menu.Item');
    expect(items).toHaveLength(0);
  });
});
