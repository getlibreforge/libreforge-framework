import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { LiaRulerCombinedSolid } from "react-icons/lia";
import FormBusinessRuleMessage from './FormBusinessRuleMessage';


@injectable()
export class FormBusinessRuleMessageProvider extends StandardComponentProvider {
  
  type = 'BusinessMsg';

  getCategory(): ComponentCategory {
    return "forms";
  }

  getIcon() {
    return <LiaRulerCombinedSolid />
  }

  getName() {
    return this.type;
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

    return (
      <FormBusinessRuleMessage
        pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        {...component.props}
        {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [];
  }

  getDefaultProps() {
    return { children: 'Business rule error here' };
  }

  isContainer() {
    return false;
  }
}
