import { injectable } from "inversify";
import { AbstractI18nLookupService } from "./AbstractI18nLookupService";

@injectable()
export class DefaultI18nLookupService extends AbstractI18nLookupService {

    t(code: string, params: any) {
        console.log(`Looking to translate '${code}'`);
        return code;
    }
}