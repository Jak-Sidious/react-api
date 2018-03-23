import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {notify} from 'react-notify-toast';

Enzyme.configure({adapter: new Adapter()});
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

notify.show = jest.fn();
