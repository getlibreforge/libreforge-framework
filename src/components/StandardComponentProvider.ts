import 'reflect-metadata';
import { injectable } from 'inversify';
import { ComponentProvider } from '../ComponentProvider';

@injectable()
export abstract class StandardComponentProvider extends ComponentProvider {

  isComposite() {
    return false;
  }
}
