import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { shallowToJson} from 'enzyme-to-json';
import { Card } from 'semantic-ui-react';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import Viewcategories from '../../components/categories/viewCategories';

describe('Viewcategories component', () => {
  const del = jest.fn();
  const pathname = 'path';
  const props = {
    post: jest.fn(() => Promise.resolve('landing')),
    onChange: jest.fn(),
    handleChange: jest.fn(),
    history: { push: jest.fn() },
    location: { pathname },
    match: {
      param: {
        id: 1
      }
    }
  };
  const wrapper = shallow(<Viewcategories  {...props}/>);

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

});
