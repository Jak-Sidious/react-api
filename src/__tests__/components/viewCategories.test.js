import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Viewcategories from '../../components/categories/viewCategories';
import Navigation from '../../components/Navbar/navbar';

describe('Viewcategories component', () => {
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
  const preventDefault = jest.fn();
  const wrapper = shallow(<Viewcategories {...props} />);

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders other components', () => {
    expect(wrapper.find(Navigation)).toHaveLength(1);
  });

  it('handles component methods', () => {
    const wrapper = shallow(<Viewcategories {...props} />);
    wrapper.instance().previousPage();
    wrapper.instance().nextPage();
    wrapper.instance().handleEdit({ preventDefault });
    wrapper.instance().handleSearch({ preventDefault });
  });

});
