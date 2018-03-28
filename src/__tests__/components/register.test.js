import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { shallowToJson} from 'enzyme-to-json';
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
  const preventDefault = jest.fn();
  const component = mount(<MemoryRouter><Register /></MemoryRouter>)
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <Register {...props} />
      </MemoryRouter>
    );
  });
  it('should render properly', () => {
    const wrapper = shallow(<Register {...props}/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should render form', () => {
    expect(component.find('Form').length).toBe(1);
    expect(component.find('Form').simulate("submit", { preventDefault }));
    expect(preventDefault).toBeCalled();
  });
});
