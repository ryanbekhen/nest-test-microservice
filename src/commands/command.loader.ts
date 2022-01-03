import { Command } from 'commander';
import { GenerateAction } from '../actions';
import { GenerateCommand } from './generate.command';
import { red } from 'chalk';
import { ERROR_PREFIX } from '../common/prefixes';
import { RunCommand } from './run.command';
import { RunAction } from '../actions/run.action';

export class CommandLoader {
  public static load(program: Command): void {
    new GenerateCommand(new GenerateAction()).load(program);
    new RunCommand(new RunAction()).load(program);

    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: Command) {
    program.on('command:*', () => {
      console.error(`\n${ERROR_PREFIX} Invalid command: ${red('%s')}`, program.args.join(' '));
      console.log(`See ${red('--help')} for a list of available commands.\n`);
      process.exit(1);
    });
  }
}
