import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { shallowToJson} from 'enzyme-to-json';
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
    // preventDefault: jest.fn(),
    match: {
      param: {
        id: 1
      }
    }
  };
  const preventDefault = jest.fn();
  const component = mount(<MemoryRouter><Login {...props}/></MemoryRouter>)
  notify.show = jest.fn();
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <Login {...props} />
      </MemoryRouter>

    );
  });
  it('should render properly', () => {
    const wrapper = shallow(<Login {...props}/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should render form', () => {
    expect(component.find('Form').length).toBe(1);
    expect(component.find('Form').simulate("submit", { preventDefault }));
    expect(preventDefault).toBeCalled();
  })
});
