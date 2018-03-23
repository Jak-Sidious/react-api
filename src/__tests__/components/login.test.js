import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { notify } from 'react-notify-toast';
import { MemoryRouter } from 'react-router-dom';

import Login from '../../components/Login/login';

Enzyme.configure({ adapter: new Adapter() });

describe('<Login />', () => {
  const props = {
    post: jest.fn(() => Promise.resolve('landing')),
    onChange: jest.fn(),
    handleChange: jest.fn(),
    history: { push: jest.fn() },
    preventDefault: jest.fn(),
    match: {
      param: {
        id: 1
      }
    }
  };
  // const preventDefault = jest.fn();
  notify.show = jest.fn();
  it('should render withoiut crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <Login {...props} />
      </MemoryRouter>
    );
  });
});
