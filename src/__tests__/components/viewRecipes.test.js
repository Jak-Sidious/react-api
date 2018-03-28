import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ViewRecipes from '../../components/recipes/viewRecipes';

describe('ViewRecipes component', () => {
  const pathname = 'path';
  const props = {
    location: { pathname },

    match: {
      params: {
        category_id: 1
      }
    }
  };
  const wrapper = shallow(<ViewRecipes {...props} />);

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('has clickable buttons', () => {
    expect(wrapper.find('#editRec').length).toBe(0);
  });
});
