import { Container } from 'inversify';
import {
  ComponentProvider,
  SYMBOL_COMPONENT_PROVIDER,
} from '../ComponentProvider';
import {ComponentCategory, ComponentType, IComponent, IComponents} from '@libreforge/libreforge-framework-shared'
import {ReactElement} from "react";
import { variableNameHidden } from './NameUtils';

export class ComponentUtils {
  getComponentTypes(container: Container): string[] {
    return container
      .getAll<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER)
      .map((p) => p.getName());
  }

  getMenuItems(container: Container): { category: ComponentCategory; icon: () => ReactElement; name: string; composite: boolean }[] {
    return container
      .getAll<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER)
      .map((p) => {
        return {category: p.getCategory(), icon: p.getIcon, name: p.getName(), composite: p.isComposite() };
      });
  }

  getComponentByName(nameOrId: string | IComponent['id'], components: IComponents): IComponent {
    return components[nameOrId];
  }

  getParentOfType(current: IComponent, type: ComponentType, pageComponents: IComponents): IComponent | undefined {
    console.warn('>>> getParentOfType');
    console.warn(current);

    if (current.id == 'root') {
      return undefined;
    }

    if (current.type === type) {
      return current;
    }

    return this.getParentOfType(pageComponents[current.parent], type, pageComponents);
  }

  getChildrenOfTypes(components: string[], types: any, pageComponents: IComponents, pageStateScoped: any): IComponent[] {
    let result: IComponent[] = []
    
    for (let i=0; i<components.length; i++) {
      const component = pageComponents[components[i]];

      /* TODO: refactor */
      const isHidden = pageStateScoped[variableNameHidden(component.props['_x_name'])];
      if (!!isHidden) {
        console.log(`${component.componentName} hidden, skipping hierarchy underneath`);
        continue;
      }

      /* If we found component */
      if (types[component.type] !== undefined) {
        result = [...result, component];
        continue;
      }

      /* Else if component doesn't have children */
      if (component.children.length === 0) {
        continue;
      }

      /* Else iterate over children */
      result = [...result, ...this.getChildrenOfTypes(component.children, types, pageComponents, pageStateScoped)];
    }

    return result;
  } 
  
  findPaginationReferingSubmit(submitButtonId: string, pageComponents: IComponents): IComponent | undefined {

    const paginations = Object.keys(pageComponents).filter(key => {
      return pageComponents[key].type === 'Pagination' && submitButtonId === pageComponents[key].props['submitButtonRef'];
    }).map(key => pageComponents[key]);

    return paginations.length > 0 ? paginations[0]: undefined;
  }  
}
