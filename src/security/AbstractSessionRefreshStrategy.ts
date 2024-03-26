import 'reflect-metadata';
import { injectable } from 'inversify';
import { RematchDispatch } from '@rematch/core';

export const SYMBOL_REFRESH_STRATEGY = 'SessionRefreshStrategy';

@injectable()
export abstract class AbstractSessionRefreshStrategy {

  /**
   * Returns true if refresh was successful
   */
  abstract refresh(dispatch: RematchDispatch<any>): Promise<boolean>;
}
