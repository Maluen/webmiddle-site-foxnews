import WebMiddle from 'webmiddle';
import config from './config';
import * as services from './services';

export default new WebMiddle({
  name: 'foxnews.com',
  settings: config,
  services,
});
