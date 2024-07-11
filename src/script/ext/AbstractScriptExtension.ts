import 'reflect-metadata';
import { injectable } from 'inversify';

export const SYMBOL_SCRIPT_EXTENSION = 'AbstractScriptExtension';

@injectable()
export abstract class AbstractScriptExtension {

  abstract getName(): string;
}
