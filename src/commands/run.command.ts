import { Command } from 'commander';
import { CommandInput } from '../common';
import { AbstractCommand } from './abstract.command';

export class RunCommand extends AbstractCommand {
  public load(program: Command): void {
    program
      .command('run')
      .argument('[path]', 'Destination path.')
      .alias('r')
      .description('Run tester ')
      .action(async (path: string) => {
        const inputs: CommandInput[] = [];
        inputs.push({ name: 'path', value: path });

        await this.action.handle(inputs);
      });
  }
}
