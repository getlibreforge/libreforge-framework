import 'reflect-metadata';
import { ReactElement, ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import ContainerComponent from '../ContainerComponent';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { TfiLayoutSidebarNone } from "react-icons/tfi";

@injectable()
export class FormControlProvider extends StandardComponentProvider {

  type = 'FormControl';

  getCategory(): ComponentCategory {
    return "forms";
  }

  getIcon() {
    return <TfiLayoutSidebarNone />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
      designMode: boolean, designModeInteractivityDisabled: boolean, forwardedProps: any, 
      overridenComponentPageState: any, collectionRefIdx: number | undefined,
      wrapperComponent?: ReactElement, wrapperContainer?: ReactElement): ReactNode {

    return (
      <ContainerComponent type={Chakra['FormControl']} 
        children={component.children} pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      {
        control: InspectorControlEnum.SwitchControl,
        props: { name: 'isInvalid', label: 'Invalid' },
      },
    ];
  }

  getDefaultProps() {
    return {
      backgroundColor: "blackAlpha.500"
    };
  }

  isContainer() {
    return true;
  }
}
