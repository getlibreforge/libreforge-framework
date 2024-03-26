import 'reflect-metadata';
import { injectable } from 'inversify';
import { ComponentProvider } from '../ComponentProvider';
import { ComposedComponent } from '../utils/Composer';

@injectable()
export abstract class CompositeComponentProvider extends ComponentProvider {
  abstract build(parent: string): ComposedComponent;

  isComposite() {
    return true;
  }
}
