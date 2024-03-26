import 'reflect-metadata';
import { Container, injectable } from 'inversify';
import { RematchDispatch } from '@rematch/core';
import { IComponents } from '@getlibreforge/libreforge-framework-shared';

export const SYMBOL_ACTION_PROVIDER = 'AbstractAction';

export type ActionExecutionContext = {
  componentId: string,

  /* Value is provided when component is rendered within [forEach] component */
  collectionRefIdx: number | undefined,
  args: any,
  pageComponents: IComponents,
  currentPageState: any,
  sharedState: any,
  dispatch: RematchDispatch<any>,
  snackbar: any,
  router: any,
  container: Container,
  prevExecutionState: { data: any, headers: any } | undefined,    
  pagination?: { page: number, size: number }  
}

@injectable()
export abstract class AbstractAction {
  abstract getName(): string;

  /** 
   * @returns state, which may be used by other Actions in down in chain - 
   *          TODO: workaround, needs to be removed once Redux sync is clarified 
   */
  abstract execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }>;

  /**
   * @returns action arguments definition
   */
  getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [];
  };
}
