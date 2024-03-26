import 'reflect-metadata';
import { ReactElement, ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@getlibreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import ContainerComponent from '../ContainerComponent';
import { IComponent, IComponents } from "@getlibreforge/libreforge-framework-shared"
import { TbLayoutColumns } from "react-icons/tb";

@injectable()
export class StackProvider extends StandardComponentProvider {
  
  type = 'Stack';

  getCategory(): ComponentCategory {
    return "layout";
  }

  getIcon() {
    return <TbLayoutColumns />
  }

  getName() {
    return this.type;
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
      designMode: boolean, designModeInteractivityDisabled: boolean, 
      forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined,
      wrapperComponent?: ReactElement, wrapperContainer?: ReactElement): ReactNode {

    return (
      <ContainerComponent type={Chakra['Stack']} children={component.children}
        pageComponents={pageComponents} pages={pages} collectionRefIdx={collectionRefIdx}
        overridenComponentPageState={overridenComponentPageState}
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
