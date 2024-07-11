import { Container } from 'inversify';
import { RematchDispatch } from '@rematch/core';
import { variableNameHidden, variableNamePropsOverride } from '../utils/NameUtils';
import { AbstractScriptExtension, SYMBOL_SCRIPT_EXTENSION } from './ext/AbstractScriptExtension';

export class ScriptContext {

  private dispatch: RematchDispatch<any>;
  private currentPageState: any;
  private sharedState: any;
  private container: Container;
  private prevExecutionData: any;
  private extensions: AbstractScriptExtension[];

  constructor(dispatch: RematchDispatch<any>, currentPageState: any, sharedState: any, container: Container, prevExecutionData: any) {
    this.dispatch = dispatch;
    this.currentPageState = currentPageState;
    this.sharedState = sharedState;
    this.container = container; 
    this.prevExecutionData = prevExecutionData;   

    /* Get registered Script Extensions */
    this.extensions = this.container.getAll<AbstractScriptExtension>(SYMBOL_SCRIPT_EXTENSION);
  }

  getExt(extName: string): AbstractScriptExtension {
    const ext = this.extensions.find((ext) => ext.getName() === extName);
    if (!ext) {
      throw new Error(`${extName} not found`);
    }

    return ext;
  }

  getInput() {
    return this.prevExecutionData;
  }

  async getValue(componentName: string) {
    return this.currentPageState[componentName];
  }

  async setValue(componentName: string, value: any) {
    await this.dispatch.app.changeCurrentPageState({ name: componentName, value });
  }

  async setSharedValue(attribute: string, value: any) {
    await this.dispatch.app.changeSharedState({ name: attribute, value });
  }

  async setDefault(componentName: string, defaultValue: any) {
    const value = await this.currentPageState[componentName];
    if (!value) {
      await this.dispatch.app.changeCurrentPageState({ name: componentName, value: defaultValue });
    }
  }  

  async setHidden(componentName: string) {
    await this.dispatch.app.changeCurrentPageState({ name: variableNameHidden(componentName), value: true });
  }

  async setVisible(componentName: string) {
    await this.dispatch.app.changeCurrentPageState({ name: variableNameHidden(componentName), value: undefined });
  }

  async setPropValue(componentName: string, propName: string, value: any) {
    const propsAttributeName = variableNamePropsOverride(componentName);
    const currentState = await this.currentPageState[componentName]?.propsAttributeName || {};

    await this.dispatch.app.changeCurrentPageState({ name: propsAttributeName, value: {...currentState, [propName]: value} });
  }  

  getLength(value: any) {
    if (!!value) {
      return value.length;
    }

    return undefined;  
  }

  async showBusinessError(errorMessage: string) {
    await this.dispatch.app.setSharedErrorMessage({ message: errorMessage });
  }
  
  async hideBusinessError() {
    await this.dispatch.app.setSharedErrorMessage({ message: undefined });
  }  
}
