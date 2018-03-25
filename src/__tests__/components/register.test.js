import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import ReactDom from 'react-dom';
import { notify } from 'react-notify-toast';
import { MemoryRouter } from 'react-router-dom';

import Register from '../../components/Register/register';

Enzyme.configure({ adapter: new Adapter() });

describe('<Register/>', () => {
  const props = {
    post: jest.fn(() => Promise.resolve('register')),
    onChange: jest.fn(),
    handleChange: jest.fn(),
    preventDefault: jest.fn(),
    history: { push: jest.fn() },
    match: {
      param: {
        id: 1
      }
    }
  };
  notify.show = jest.fn();
  it('should render withoiut crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <Register {...props} />
      </MemoryRouter>
    );
  });
});
