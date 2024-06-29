import 'reflect-metadata';
import { ReactElement, ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../../StandardComponentProvider';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import ComponentPagination from './ComponentPagination';
import { TbNumbers } from "react-icons/tb";

@injectable()
export class ComponentPaginationProvider extends StandardComponentProvider {
  
  type = 'Pagination';

  getCategory(): ComponentCategory {
    return "tools";
  }

  getIcon() {
    return <TbNumbers />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
      designMode: boolean, designModeInteractivityDisabled: boolean, 
      forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined,
      wrapperComponent?: ReactElement, wrapperContainer?: ReactElement): ReactNode {

    return (
      <ComponentPagination type={Chakra['Container']} children={component.children}
        pageComponents={pageComponents} pages={pages} componentId={component.id}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      { control: InspectorControlEnum.TextControl, props: { name: 'collectionRef', label: 'Collection' } },
      { control: InspectorControlEnum.SizeControl, props: { name: 'size', label: 'Size' } },
      { control: InspectorControlEnum.ColorsControl, props: { name: 'colorScheme', label: 'Color' } },
      { control: InspectorControlEnum.TextControl, props: { name: 'submitButtonRef', label: 'Submit Button Id' } },
    ];
  }

  getDefaultProps() {
    return { 
      pageSize: 10, margin: 2, fontWeight: "normal", 
      variant: "outline", selectedVariant: "solid", borderRadius: "sm"
    };
  }

  isContainer() {
    return false;
  }
}
