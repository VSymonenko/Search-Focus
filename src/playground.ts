import { bcrypt } from './share';
import { fList } from './fixtures';

postMessage(
  {
    pluginMessage: {type: 'send-list',
    list: Array.from(fList.map((it) => bcrypt(it)))},
  },
  opener);
