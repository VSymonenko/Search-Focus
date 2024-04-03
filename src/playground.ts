import { bcrypt } from './share';
import { fList } from './fixtures';

const list = Array.from(fList.map((it) => bcrypt(it)));

postMessage(
  {
    pluginMessage: { type: 'send-list', list },
  },
  opener);
