import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@getlibreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import { IComponent, IComponents } from "@getlibreforge/libreforge-framework-shared"
import { BiError } from "react-icons/bi";
import FormErrorMessageComponent from './FormErrorMessageComponent';

@injectable()
export class FormErrorMessageProvider extends StandardComponentProvider {
  
  type = 'FormErrorMessage';

  getCategory(): ComponentCategory {
    return "forms";
  }

  getIcon() {
    return <BiError />
  }

  getName() {
    return this.type;
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

    return (
      <FormErrorMessageComponent
        pageComponents={pageComponents} collectionRefIdx={collectionRefIdx} componentId={component.id}
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
    return { children: 'Invalid value' };
  }

  isContainer() {
    return false;
  }
}
