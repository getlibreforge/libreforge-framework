import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import PreviewComponent from '../PreviewComponent';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { RiListRadio } from "react-icons/ri";

@injectable()
export class RadioProvider extends StandardComponentProvider {
  
  type = 'Radio';

  getCategory(): ComponentCategory {
    return "experimental";
  }

  getIcon() {
    return <RiListRadio />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

      return (
      <PreviewComponent
        type={Chakra['Radio']}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        {...component.props}
        {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      { control: InspectorControlEnum.ChildrenControl, props: {} },
      {
        control: InspectorControlEnum.SizeControl,
        props: { name: 'size', label: 'Size' },
      },
      {
        control: InspectorControlEnum.ColorsControl,
        props: { name: 'colorScheme', label: 'Color Scheme' },
      },
      {
        control: InspectorControlEnum.SwitchControl,
        props: { name: 'isChecked', label: 'Checked' },
      },
      {
        control: InspectorControlEnum.SwitchControl,
        props: { name: 'isInvalid', label: 'Invalid' },
      },
    ];
  }

  getDefaultProps() {
    return { 
      children: 'Radio',
      _x_onchange: 'DefaultValueChange'
    };
  }

  isContainer() {
    return false;
  }
}
