import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ModalCreateRecipe from '../../components/commonComponents/createRecipeModal';

describe('ModalCreateRecipe component', () => {
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
  const wrapper = shallow(<ModalCreateRecipe {...props} />);

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('creates recipe on click', () => {
    expect(wrapper.find('#createRec').length).toBe(1);
  });
});
