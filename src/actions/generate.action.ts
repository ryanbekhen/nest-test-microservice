import { green } from 'chalk';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path/posix';
import { CommandInput, INFO_PREFIX } from '../common';
import { AbstractAction } from './abstract.action';

export class GenerateAction extends AbstractAction {
  public async handle(inputs: CommandInput[]): Promise<void> {
    await generateFiles(inputs);
  }
}

const generateFiles = async (inputs: CommandInput[]) => {
  const transport = inputs.find((option) => option.name === 'transport')!.value as string;
  const path = inputs.find((option) => option.name === 'path')?.value as string;

  if (path && !existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }

  let config = {};

  if (transport === 'redis') {
    config = {
      url: 'redis://localhost:6379',
    };
  } else if (transport === 'tcp') {
    config = {
      host: '127.0.0.1',
      port: 80,
    };
  }

  const handler = {
    pattern: '',
    data: '',
  };

  writeFileSync(path ? join(path, 'config.json') : 'config.json', JSON.stringify(config, null, 4), 'utf-8');
  writeFileSync(
    path ? join(path, 'example-handler.json') : 'example-handler.json',
    JSON.stringify(handler, null, 4),
    'utf-8',
  );

  console.log(
    `\n${INFO_PREFIX} Successfully generated a microservice file tester with ${green('%s')} transport.`,
    transport,
  );
};
