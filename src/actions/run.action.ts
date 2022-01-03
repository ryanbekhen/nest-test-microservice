import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { red, green } from 'chalk';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'path';
import { join } from 'path/posix';
import { lastValueFrom } from 'rxjs';
import { CommandInput, ERROR_PREFIX, INFO_PREFIX } from '../common';
import { AbstractAction } from './abstract.action';

export class RunAction extends AbstractAction {
  public async handle(inputs: CommandInput[]): Promise<void> {
    await runTester(inputs);
  }
}

const runTester = async (inputs: CommandInput[]) => {
  const path = inputs.find((option) => option.name === 'path')?.value as string;
  const directory = parse(path).dir;

  if (path && (!existsSync(join(directory, 'config.json')) || !existsSync(path))) {
    console.error(`\n${ERROR_PREFIX} Invalid path : ${red('%s')}`, path);
    console.log(`Invalid ${red('path')} or does not have ${red('config.json')}.\n`);
    process.exit(1);
  }

  const options = JSON.parse(readFileSync(join(directory, 'config.json'), 'utf-8'));
  const pattern = JSON.parse(readFileSync(path, 'utf-8'));

  const client: ClientProxy = ClientProxyFactory.create({
    transport: Object.keys(options).includes('url') ? Transport.REDIS : Transport.TCP,
    options,
  });

  try {
    const response = await lastValueFrom(client.send(pattern.pattern, pattern.data), {
      defaultValue: undefined,
    });

    if (response) {
      console.log(`\n${INFO_PREFIX} Response from : ${green(pattern.pattern)}`);
      console.log(response);
    } else {
      console.log(`\n${INFO_PREFIX} Call to ${green(pattern.pattern)} successful`);
    }
  } catch (ex: any) {
    console.error(`\n${ERROR_PREFIX} Error : ${red('%s')}`, ex.message);
  } finally {
    process.exit(1);
  }
};
