import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { shallowToJson} from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import CreateCategory from '../../components/categories/createCategory';

Enzyme.configure({ adapter: new Adapter() });

describe('<CreateCategory />', () => {
  const pathname = 'path';
  const props = {
    location: { pathname }
  };
  const preventDefault = jest.fn();
  const component = mount(<MemoryRouter><CreateCategory {...props}/></MemoryRouter>)
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <CreateCategory {...props} />
      </MemoryRouter>
    );
  });
  it('should render properly', () => {
    const wrapper = shallow(<CreateCategory {...props}/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should render form', () => {
    expect(component.find('Form').length).toBe(1);
    expect(component.find('Form').simulate("submit", { preventDefault }));
    expect(preventDefault).toBeCalled();
  });

  it('should create category', () => {
    const wrapper = shallow(<CreateCategory {...props}/>)
    expect(wrapper.find('#submitButton').length).toBe(1);
    expect(wrapper.find('#submitButton').simulate("submit", { preventDefault }));
    expect(wrapper.instance().handleCreate({preventDefault}));
  });
});
