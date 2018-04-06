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
  const preventDefault = jest.fn();
  const wrapper = shallow(<ViewRecipes {...props} />);

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('has clickable buttons', () => {
    expect(wrapper.find('#editRec').length).toBe(0);
  });

  it('handles component Methods', () => {
    const wrapper = shallow(<ViewRecipes {...props} />);
    wrapper.instance().previousPage();
    wrapper.instance().nextPage();
    wrapper.instance().handleEdit({ preventDefault });
    wrapper.instance().handleSearch({ preventDefault });
    wrapper.instance().deleteRecipe();
    wrapper.instance().getRecipes();
  })
});
