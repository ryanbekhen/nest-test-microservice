import { CommandInput } from '../common';

export abstract class AbstractAction {
  public abstract handle(inputs?: CommandInput[], options?: CommandInput[], extraFlags?: string[]): Promise<void>;
}
