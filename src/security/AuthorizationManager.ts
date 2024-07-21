import 'reflect-metadata';
import { injectable } from 'inversify';
import { Container } from 'inversify';
import { AbstractAuthorizationConfigProvider, SYMBOL_AUTHORIZATION_CONFIG_PROVIDER } from './AbstractAuthorizationConfigProvider';
import { AbstractSessionRefreshStrategy, SYMBOL_REFRESH_STRATEGY } from './AbstractSessionRefreshStrategy';
import { RematchDispatch } from '@rematch/core';

export const SYMBOL_AUTHORIZATION_MANAGER = 'AuthorizationManager';
const SHARED_STATE_TOKEN = 'token';

@injectable()
export class AuthorizationManager {
  
  async authorize(href: string, pathname: string, sharedState: any, container: Container, dispatch: RematchDispatch<any>): Promise<string | undefined> {

    const authConfig = container.get<AbstractAuthorizationConfigProvider>(SYMBOL_AUTHORIZATION_CONFIG_PROVIDER);
    if (!authConfig) {
      return undefined;
    }

    if (!pathname || pathname === '' || pathname === '/') {
      return undefined;      
    }

    /* Check origin is among public pages */
    const publicPatterns = authConfig.getPublicPatterns();
    for (let i=0; i<publicPatterns.length; i++) {
      if (true === publicPatterns[i].test(href)) {
        return undefined;
      }
    }

    /* TODO: check restricted page against allowed roles */
    /* authConfig.getRestrictedPatterns(); */

    /* Check sharedState has _token */
    if (!!sharedState[SHARED_STATE_TOKEN]) {
      return undefined;
    }

    /* Attempt to refresh token */
    const refreshStrategy = container.get<AbstractSessionRefreshStrategy>(SYMBOL_REFRESH_STRATEGY);
    if (!!refreshStrategy) {
      const isRefreshed = await refreshStrategy.refresh(dispatch);
      if (true === isRefreshed) {
        return undefined;
      }
    }

    const redirect_uri = window.location.pathname + window.location.search;
    return `${authConfig.getLoginPagePath()}?redirect_uri=${encodeURIComponent(redirect_uri)}` ;
  };
}
