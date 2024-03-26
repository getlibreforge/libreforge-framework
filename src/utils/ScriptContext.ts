import { Container } from 'inversify';
import { RematchDispatch } from '@rematch/core';

export class ScriptContext {

  private dispatch: RematchDispatch<any>;
  private currentPageState: any;
  private sharedState: any;
  private container: Container;

  constructor(dispatch: RematchDispatch<any>, currentPageState: any, sharedState: any, container: Container) {
    this.dispatch = dispatch;
    this.currentPageState = currentPageState;
    this.sharedState = sharedState;
    this.container = container;    
  }

  async getValue(name: string) {
    return this.currentPageState[name];
  }

  async setValue(name: string, value: any) {
    await this.dispatch.app.changeCurrentPageState({ name, value });;
  }
}
