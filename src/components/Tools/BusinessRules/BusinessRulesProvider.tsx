import 'reflect-metadata';
import { ReactElement, ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../../StandardComponentProvider';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { TbScript } from "react-icons/tb";
import BusinessRulesComponent from './BusinessRulesComponent';

@injectable()
export class BusinessRulesProvider extends StandardComponentProvider {

  type = 'Business Rules';

  getCategory(): ComponentCategory {
    return "tools";
  }

  getIcon() {
    return <TbScript />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
      designMode: boolean, designModeInteractivityDisabled: boolean, 
      forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined,
      wrapperComponent?: ReactElement, wrapperContainer?: ReactElement): ReactNode {

    return (
      <BusinessRulesComponent 
        componentId={component.id} pageComponents={pageComponents} 
        designMode={designMode} pages={pages} collectionRefIdx={collectionRefIdx}
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [ 
      {
        control: InspectorControlEnum.BusinessRulesControl,
        props: { name: 'brules', label: 'Rules' },
      },      
    ];
  }

  getDefaultProps() {
    return { w: '28px', color: 'messenger.900' };
  }

  isContainer() {
    return false;
  }
}
