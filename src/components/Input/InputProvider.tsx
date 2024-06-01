import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import PreviewComponent from '../PreviewComponent';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { RxInput } from "react-icons/rx";

@injectable()
export class InputProvider extends StandardComponentProvider {
  
  type = 'Input';

  getCategory(): ComponentCategory {
    return "fields";
  }

  getIcon() {
    return <RxInput />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

      return (
        <PreviewComponent
          componentId={component.id} type={Chakra['Input']} overridenComponentPageState={overridenComponentPageState}
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
        props: { name: 'value', label: 'Value' },
      },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'placeholder', label: 'Placeholder' },
      },
      {
        control: InspectorControlEnum.VariantsControl,
        props: { name: 'variant', label: 'Variant' },
      },
      {
        control: InspectorControlEnum.ValidationControl,
        props: { name: '_x_rule', label: 'Validation' },
      },
    ];
  }

  getDefaultProps() {
    return { _x_onchange: 'DefaultValueChange', backgroundColor: "blackAlpha.500" };
  }

  isContainer() {
    return false;
  }
}
