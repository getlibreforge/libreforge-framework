import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { PiPassword } from "react-icons/pi";
import PasswordInputComponent from './PasswordInputComponent';

@injectable()
export class PasswordInputProvider extends StandardComponentProvider {
  
  type = 'PasswordInput';

  getCategory(): ComponentCategory {
    return "fields";
  }

  getIcon() {
    return <PiPassword />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

      return (
        <PasswordInputComponent
          componentId={component.id} type={Chakra['Input']} 
          designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
          pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
          {...component.props} {...forwardedProps}
        />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      {
        control: InspectorControlEnum.SizeControl,
        props: { name: 'size', label: 'Size' },
      },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'placeholder', label: 'Placeholder' },
      },
      {
        control: InspectorControlEnum.ValidationControl,
        props: { name: '_x_rule', label: 'Validation' },
      },      
    ];
  }

  getDefaultProps() {
    return { 
      _x_onchange: "DefaultValueChange", 
      backgroundColor: "blackAlpha.500",
      placeholder: "Enter password",
      size: "md" 
    };
  }

  isContainer() {
    return false;
  }
}
