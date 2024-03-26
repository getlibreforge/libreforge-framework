import 'reflect-metadata';
import { injectable } from 'inversify';
import { RematchDispatch } from '@rematch/core';

export const SYMBOL_DATA_PROVIDER = 'DataProvider';

export enum ExecuteStage {
  PAGE_LOAD,
  RUNTIME,
}

@injectable()
export abstract class DataProvider {
  abstract getName(): string;

  abstract getType(): string;

  abstract execute(dispatch: RematchDispatch<any>): void;

  abstract getStage(): ExecuteStage;
}
