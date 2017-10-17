import 'jest-enzyme';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  TODOs: [{"title":"test0","desc":"test0 dec","type":"spare time","start":"2017-10-17T00:00:00.000Z","end":"2017-10-18T00:00:00.000Z","id":1}]
};
global.localStorage = localStorageMock
