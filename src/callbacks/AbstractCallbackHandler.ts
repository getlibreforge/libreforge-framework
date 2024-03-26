import 'reflect-metadata';
import { injectable } from 'inversify';
import { RematchDispatch } from '@rematch/core';

export const SYMBOL_CALLBACK_PROVIDER = 'CallbackHandler';

@injectable()
export abstract class AbstractCallbackHandler {

  abstract getRoute(): string;

  abstract execute(
    appState: any,
    dispatch: RematchDispatch<any>,
    snackbar: any,
    router: any
  ): Promise<void>;
}
