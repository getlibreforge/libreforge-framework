import 'reflect-metadata';
import { ReactElement, ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../../StandardComponentProvider';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { VscReferences } from "react-icons/vsc";
import ComponentRefComponent from './ComponentRefComponent';

@injectable()
export class ComponentRefProvider extends StandardComponentProvider {

  type = 'ComponentRef';

  getCategory(): ComponentCategory {
    return "tools";
  }

  getIcon() {
    return <VscReferences />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
      designMode: boolean, designModeInteractivityDisabled: boolean, forwardedProps: any, 
      overridenComponentPageState: any, collectionRefIdx: number | undefined,
      wrapperComponent?: ReactElement, wrapperContainer?: ReactElement): ReactNode {

    /* Override pageComponents according to _x_page_ref */
    const namePageRef = component.props['_x_page_ref']
    const overridenPageComponents = !!namePageRef ? (pages[namePageRef] || []): []

    return (
      <ComponentRefComponent 
        componentId={component.id} pageComponents={overridenPageComponents} 
        designMode={designMode} pages={pages} collectionRefIdx={collectionRefIdx}
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [ 
      { control: InspectorControlEnum.PageSelectControl, props: { name: '_x_page_ref', label: 'Page' } },
      { control: InspectorControlEnum.PageComponentSelectControl, props: { name: '_x_comp_ref', label: 'Component' } },
    ];
  }

  getDefaultProps() {
    return { };
  }

  isContainer() {
    return false;
  }
}
