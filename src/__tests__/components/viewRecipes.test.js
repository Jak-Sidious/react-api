import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { shallowToJson} from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import ViewRecipes from '../../components/categories/viewCategories';

Enzyme.configure({ adapter: new Adapter() });

describe('<ViewRecipes />', () => {
  const pathname = 'path';
  const props = {
    location: { pathname }
  };

  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <ViewRecipes {...props} />
      </MemoryRouter>
    );
  });
  it('should render properly', () => {
    const wrapper = shallow(<ViewRecipes {...props}/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
