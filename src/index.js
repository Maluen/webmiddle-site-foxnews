import WebMiddle from 'webmiddle';
import settings from './settings';
import * as services from './services';

export default new WebMiddle({
  name: 'foxnews.com',
  services,
});

export { settings };
