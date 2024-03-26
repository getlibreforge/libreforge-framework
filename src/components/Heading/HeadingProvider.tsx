import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@getlibreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import PreviewComponent from '../PreviewComponent';
import { IComponent, IComponents } from "@getlibreforge/libreforge-framework-shared"
import { LuHeading } from "react-icons/lu";

@injectable()
export class HeadingProvider extends StandardComponentProvider {
  
  type = 'Heading';

  getCategory(): ComponentCategory {
    return "basic";
  }

  getIcon() {
    return <LuHeading />
  }

  getName() {
    return this.type;
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

    return (
      <PreviewComponent
        type={Chakra['Heading']}
        pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        {...component.props}
        {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      { control: InspectorControlEnum.ChildrenControl, props: {} },
    ];
  }

  getDefaultProps() {
    return { children: 'Heading' };
  }

  isContainer() {
    return false;
  }
}
