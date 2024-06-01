import 'reflect-metadata';
import { ReactElement, ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import ContainerComponent from '../../components/ContainerComponent';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { TfiLayoutSidebarNone } from "react-icons/tfi";

@injectable()
export class ContainerProvider extends StandardComponentProvider {
  
  type = 'Container';

  getCategory(): ComponentCategory {
    return "layout";
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
      <ContainerComponent type={Chakra['Container']} children={component.children} collectionRefIdx={collectionRefIdx}
        pageComponents={pageComponents} pages={pages} overridenComponentPageState={overridenComponentPageState}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [];
  }

  getDefaultProps() {
    return { pt: 5, pb: 5, backgroundColor: "blackAlpha.500" };
  }

  isContainer() {
    return true;
  }
}
