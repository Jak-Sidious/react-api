import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import Viewcategories from '../../components/categories/viewCategories';

Enzyme.configure({ adapter: new Adapter() });

describe('<CViewcategories />', () => {
  const pathname = 'path';
  const props = {
    location: { pathname }
  };

  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <Viewcategories {...props} />
      </MemoryRouter>
    );
  });
});
