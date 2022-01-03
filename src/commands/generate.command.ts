import { Command, Argument } from 'commander';
import { CommandInput } from '../common';
import { AbstractCommand } from './abstract.command';

export class GenerateCommand extends AbstractCommand {
  public load(program: Command): void {
    program
      .command('generate')
      .addArgument(new Argument('<transport>', 'Microservice transport layer.').choices(['tcp', 'redis']))
      .argument('[path]', 'Destination path.')
      .alias('g')
      .description('Generate configuration for microservice tester.')
      .action(async (transport: string, path: string) => {
        const inputs: CommandInput[] = [];
        inputs.push({ name: 'transport', value: transport });
        inputs.push({ name: 'path', value: path });

        await this.action.handle(inputs);
      });
  }
}
