import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Form, Button } from 'semantic-ui-react';
import { notify } from 'react-notify-toast';
import { MemoryRouter } from 'react-router-dom';

import Navigation from '../../components/Navbar/navbar';

Enzyme.configure({ adapter: new Adapter() });

describe('<Navigation />', () => {
  it('should render withoiut crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
  });

});
