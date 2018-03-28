import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ModalEditRec from '../../components/commonComponents/editRecipeModal';

describe('ModalEditRec component', () => {
  const del = jest.fn();
  const wrapper = shallow(<ModalEditRec  />);

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('has clickable button', () => {
    expect(wrapper.find('#recEdit').length).toBe(1);
  });
});
