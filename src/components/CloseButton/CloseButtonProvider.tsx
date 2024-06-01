import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import NativeComponentRenderer from '../NativeComponentRenderer';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { AiOutlineCloseSquare } from "react-icons/ai";

@injectable()
export class CloseButtonProvider extends StandardComponentProvider {
  
  type = 'CloseButton';

  getCategory(): ComponentCategory {
    return "basic";
  }

  getIcon() {
    return <AiOutlineCloseSquare />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, forwardedProps: any, 
    overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {
    return (
      <NativeComponentRenderer
        type={Chakra['CloseButton']} 
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
        control: InspectorControlEnum.ColorsControl,
        props: { name: 'color', label: 'Color', enableHues: true },
      },
      {
        control: InspectorControlEnum.ActionChangeControl,
        props: { name: '_x_onclick_1', label: 'onClick #1' },
      },
      {
        control: InspectorControlEnum.ActionChangeControl,
        props: { name: '_x_onclick_2', label: 'onClick #2' },
      },
      {
        control: InspectorControlEnum.ActionChangeControl,
        props: { name: '_x_onclick_3', label: 'onClick #3' },
      },      
    ];
  }

  getDefaultProps() {
    return { size: 'md' };
  }

  isContainer() {
    return false;
  }
}
