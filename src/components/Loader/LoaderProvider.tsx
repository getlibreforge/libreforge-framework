import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { PiSpinnerGapBold } from "react-icons/pi";
import LoaderComponent from './LoaderComponent';

@injectable()
export class LoaderProvider extends StandardComponentProvider {
  
  type = 'Progress';

  getCategory(): ComponentCategory {
    return "basic";
  }

  getIcon() {
    return <PiSpinnerGapBold />
  }

  getName() {
    return "Loader";
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

    return (
      <LoaderComponent
        pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
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
    ];
  }

  getDefaultProps() {
    return { isIndeterminate: true, size: 'xs', width: "100%" };
  }

  isContainer() {
    return false;
  }
}
