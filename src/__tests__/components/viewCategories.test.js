import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { shallowToJson} from 'enzyme-to-json';
import { Card } from 'semantic-ui-react';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import Viewcategories from '../../components/categories/viewCategories';

Enzyme.configure({ adapter: new Adapter() });

describe('<Viewcategories />', () => {
  const pathname = 'path';
  const props = {
    location: { pathname }
  };

  const preventDefault = jest.fn();
  const component = mount(<MemoryRouter><Viewcategories {...props}/></MemoryRouter>)
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <MemoryRouter>
        <Viewcategories {...props} />
      </MemoryRouter>
    );
  });
  it('should render properly', () => {
    const wrapper = shallow(<Viewcategories {...props}/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
