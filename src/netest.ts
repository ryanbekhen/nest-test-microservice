#!/usr/bin/env node

import { Command } from 'commander';
import { CommandLoader } from './commands';

function bootstrap() {
  const program: Command = new Command();
  program
    .description(require('../package.json').description)
    .version(require('../package.json').version, '-v, --version', 'Output the current version.')
    .usage('<command> [options]')
    .helpOption('-h, --help', 'Output usage information.');
  CommandLoader.load(program);
  program.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

bootstrap();
