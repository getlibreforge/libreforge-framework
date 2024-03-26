import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@getlibreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../../StandardComponentProvider';
import PreviewComponent from '../../PreviewComponent';
import { IComponent, IComponents } from "@getlibreforge/libreforge-framework-shared"
import { PiTextAa } from "react-icons/pi";

@injectable()
export class TextProvider extends StandardComponentProvider {
  
  type = 'Text';

  getCategory(): ComponentCategory {
    return "basic";
  }

  getIcon() {
    return <PiTextAa />
  }

  getName() {
    return this.type;
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

    return (
      <PreviewComponent
        type={Chakra['Text']}
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
    return { children: 'Text value' };
  }

  isContainer() {
    return false;
  }
}
