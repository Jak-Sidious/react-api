import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Form, Button } from 'semantic-ui-react';
import { notify } from 'react-notify-toast';
import { MemoryRouter } from 'react-router-dom';

import Landing from '../../components/Landing/landing';

Enzyme.configure({ adapter: new Adapter() });

describe('<Landing />', () => {
  const pathname = 'path';
  const props = {
    location: { pathname }
  }
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <Landing {...props}/>
      </MemoryRouter>
    );
  });

});
