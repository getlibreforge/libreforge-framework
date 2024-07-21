import 'reflect-metadata';
import { injectable } from 'inversify';
import { AbstractAction, ActionExecutionContext } from './AbstractAction';
import { getUrlQueryParam } from '../utils';

@injectable()
export abstract class AbstractRedirectAwareAction extends AbstractAction {

  async execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }> {

      const redirectUri = getUrlQueryParam("redirect_uri");

      if (!!redirectUri) {
        context.router(redirectUri);
        return { next: false, result: undefined };        
      } 
      
      return { next: true, result: undefined };
    }
}