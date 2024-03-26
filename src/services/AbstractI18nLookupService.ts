import { injectable } from "inversify";

export const SYMBOL_I18N_PROVIDER = 'I18nLookupService';

@injectable()
export abstract class AbstractI18nLookupService {

    abstract t(code: string, params: any): string;
}