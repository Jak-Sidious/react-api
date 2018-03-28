import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Protected from '../../components/commonComponents/Protected';

describe('Login component', () => {
  const wrapper = shallow(<Protected />);

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
