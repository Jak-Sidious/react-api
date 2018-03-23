import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import Navigation from '../../components/Navbar/navbar';

Enzyme.configure({ adapter: new Adapter() });

describe('<Navigation />', () => {
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
  });
});
