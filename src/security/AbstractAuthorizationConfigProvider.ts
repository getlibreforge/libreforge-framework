import 'reflect-metadata';
import { injectable } from 'inversify';

export const SYMBOL_AUTHORIZATION_CONFIG_PROVIDER = 'AuthorizationConfigProvider';

@injectable()
export abstract class AbstractAuthorizationConfigProvider {

  abstract getLoginPagePath(): string;

  abstract getPublicPatterns(): RegExp[];

  abstract getRestrictedPatterns(): { pattern: RegExp, roles: string[] }[];
}
