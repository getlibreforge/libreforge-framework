import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import * as Chakra from '@chakra-ui/react';
import PreviewComponent from '../PreviewComponent';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { BiImage } from "react-icons/bi";

@injectable()
export class ImageProvider extends StandardComponentProvider {
  
  type = 'Image';

  getCategory(): ComponentCategory {
    return "basic";
  }

  getIcon() {
    return <BiImage/>
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

    return (
      <PreviewComponent
        type={Chakra['Image']} pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      { control: InspectorControlEnum.ImageSourceControl, props: { name: 'src', label: 'Src' } },
    ];
  }

  getDefaultProps() {
    return { src: 'https://bit.ly/dan-abramov' };
  }

  isContainer() {
    return false;
  }
}
