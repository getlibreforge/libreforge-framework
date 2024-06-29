import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import NativeComponentRenderer from '../NativeComponentRenderer';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { BsLink } from "react-icons/bs";

@injectable()
export class LinkProvider extends StandardComponentProvider {
  
  type = 'Link';

  getCategory(): ComponentCategory {
    return "basic";
  }

  getIcon() {
    return <BsLink />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

      return (
        <NativeComponentRenderer
          type={Chakra['Link']} 
          designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
          pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
          {...component.props} {...forwardedProps} componentId={component.id}
        />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      { control: InspectorControlEnum.ChildrenControl, props: {} },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'href', label: 'Href' },
      },
      {
        control: InspectorControlEnum.SwitchControl,
        props: { name: 'isExternal', label: 'External' },
      },        
      { 
        control: InspectorControlEnum.ActionGroupControl, 
        props: { name: 'actionGroup', label: 'Actions' }, 
      },
    ];
  }

  getDefaultProps() {
    return { children: 'Link text', color: "messenger.500" };
  }

  isContainer() {
    return false;
  }
}
