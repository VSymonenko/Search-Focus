import { fList } from './fixtures';
import { bcrypt } from './share';

postMessage({pluginMessage: {type: 'send-list', list: Array.from(fList.map((it) => bcrypt(it)))}}, opener);
