import minimist from 'minimist';
import arg from 'arg';
import { list } from './list';
import { retrieve } from './retrieve';
import {deleteItem} from './rm'
import { create } from './create';
import { help } from './help';
import { update } from './update';
// import { version } from './version';


export async function cli(argsArray) {
  const args = minimist(argsArray.slice(2));
  let cmd = args._[0] || 'help';

  if (args.help || args.h) {
    cmd = 'help';
  }

  switch (cmd) {
    case 'help':
      help(args);
      break;

    case 'ls':
      list(args)
      break;

    case 'ps':
      retrieve(args)
      break;

    case 'create':
      create(args)
      break;

    case 'update':
      update(args)
      break;

    case 'rm':
      deleteItem(args)
      break;

    default:
      console.error(`"${cmd}" is not a valid command! 'message --help' check more details`);
      break;
  }
}