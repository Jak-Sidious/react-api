import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { shallowToJson} from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { MemoryRouter } from 'react-router-dom';

import Landing from '../../components/Landing/landing';


Enzyme.configure({ adapter: new Adapter() });

describe('<Landing />', () => {
  const pathname = 'path';
  const props = {
    location: { pathname }
  };
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <Landing {...props} />
      </MemoryRouter>
    );
  });
  it('should render properly', () => {
    const wrapper = shallow(<Landing {...props}/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
