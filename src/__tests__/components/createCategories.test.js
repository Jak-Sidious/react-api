import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Form, Button } from 'semantic-ui-react';
import { notify } from 'react-notify-toast';
import { MemoryRouter } from 'react-router-dom';

import CreateCategory from '../../components/categories/createCategory';

Enzyme.configure({ adapter: new Adapter() });

describe('<CreateCategory />', () => {
  const pathname = 'path';
  const props = {
    location: { pathname }
  }

  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <CreateCategory {...props}/>
      </MemoryRouter>
    );
  });

});
