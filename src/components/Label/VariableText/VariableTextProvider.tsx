import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../../StandardComponentProvider';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { TbBraces } from "react-icons/tb";
import VariableTextComponent from './VariableTextComponent';

@injectable()
export class VariableTextProvider extends StandardComponentProvider {
  
  type = 'VariableText';

  getCategory(): ComponentCategory {
    return "basic";
  }

  getIcon() {
    return <TbBraces />
  }

  getName() {
    return this.type;
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

    return (
      <VariableTextComponent
        pageComponents={pageComponents} pages={pages} 
        overridenComponentPageState={overridenComponentPageState} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        {...component.props}
        {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      { control: InspectorControlEnum.ChildrenControl, props: {} },
    ];
  }

  getDefaultProps() {
    return { children: '${pageVariable}' };
  }

  isContainer() {
    return false;
  }
}
