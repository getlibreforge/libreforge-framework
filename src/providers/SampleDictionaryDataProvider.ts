import 'reflect-metadata';
import { injectable } from 'inversify';
import { RematchDispatch } from '@rematch/core';
import { DataProvider, ExecuteStage } from './DataProvider';

@injectable()
export class SampleDictionaryDataProvider extends DataProvider {
  name = 'sample';
  type = 'DictionaryProvider';

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }

  execute(dispatch: RematchDispatch<any>) {
    const values = [
      { code: 'code_sample_1', value: 'Option Changed 1' },
      { code: 'code_sample_2', value: 'Option Changed 2' },
    ];

    // dispatch.app.updateDictionary({ dictionaryName: this.name, values });
  }

  getStage() {
    return ExecuteStage.PAGE_LOAD;
  }
}
