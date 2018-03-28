import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import toJson, { shallowToJson} from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { notify } from 'react-notify-toast';
import { MemoryRouter } from 'react-router-dom';

import Login from '../../components/Login/login';

describe('Login component', () => {
  const login = jest.fn();
  const wrapper = shallow(<Login login={login} location={{}} />);
  const preventDefault = jest.fn();

  it('renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('it renders state initially', () => {
    expect(wrapper.state().username).toEqual('');
    expect(wrapper.state().password).toEqual('');
  });

  it('should login a user', () => {
    wrapper.setState({
      username: 'user',
      password: 'user1234',
    });
    wrapper.find('#btn1').simulate('submit', { preventDefault });
    expect(wrapper.instance().handleLogin({ preventDefault }));
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('has clickable button which logs in a user', () => {
    expect(wrapper.find('#btn1').length).toBe(1);
    expect(wrapper.find('#btn1').simulate('click'));
  });

})
