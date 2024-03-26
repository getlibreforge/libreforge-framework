import 'reflect-metadata';
import { ReactElement, ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@getlibreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../../StandardComponentProvider';
import ContainerComponent from '../../../components/ContainerComponent';
import { IComponent, IComponents } from "@getlibreforge/libreforge-framework-shared"
import { RxRows } from "react-icons/rx";
import ComponentForEach from './ComponentForEach';

@injectable()
export class ComponentForEachProvider extends StandardComponentProvider {
  
  type = 'forEach';

  getCategory(): ComponentCategory {
    return "tools";
  }

  getIcon() {
    return <RxRows />
  }

  getName() {
    return this.type;
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
      designMode: boolean, designModeInteractivityDisabled: boolean, 
      forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined,
      wrapperComponent?: ReactElement, wrapperContainer?: ReactElement): ReactNode {

    return (
      <ComponentForEach type={Chakra['Container']} children={component.children}
        pageComponents={pageComponents} pages={pages}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer}
        {...component.props} {...forwardedProps}  
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      { control: InspectorControlEnum.TextControl, props: { name: 'collectionRef', label: 'Collection' } },
    ];
  }

  getDefaultProps() {
    return { pt: 5, pb: 5, backgroundColor: "blackAlpha.500" };
  }

  isContainer() {
    return true;
  }
}
