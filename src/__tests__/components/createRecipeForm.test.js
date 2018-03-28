import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { shallowToJson} from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import CreateRecipeForm from '../../components/commonComponents/createRecipeForm';

Enzyme.configure({ adapter: new Adapter() });

describe('<CreateRecipeForm />', () => {
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
  const preventDefault = jest.fn();
  const component = mount(<MemoryRouter><CreateRecipeForm {...props} /></MemoryRouter>)
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <CreateRecipeForm {...props} />
      </MemoryRouter>
    );
  });
  it('should render properly', () => {
    const wrapper = shallow(<CreateRecipeForm {...props}/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should render form', () => {
    expect(component.find('Form').length).toBe(1);
    expect(component.find('Form').simulate("submit", { preventDefault }));
    expect(preventDefault).toBeCalled();

  })
});
