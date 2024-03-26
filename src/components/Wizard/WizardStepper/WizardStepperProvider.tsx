import 'reflect-metadata';
import { ReactElement, ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../../StandardComponentProvider';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { FaHatWizard } from "react-icons/fa";
import WizardStepperComponent from './WizardStepperComponent';

@injectable()
export class WizardStepperProvider extends StandardComponentProvider {
  
  type = 'Stepper';

  getCategory(): ComponentCategory {
    return "wizard";
  }

  getIcon() {
    return <FaHatWizard />
  }

  getName() {
    return this.type;
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
      designMode: boolean, designModeInteractivityDisabled: boolean, forwardedProps: any,
      overridenComponentPageState: any, collectionRefIdx: number | undefined,
      wrapperComponent?: ReactElement, wrapperContainer?: ReactElement): ReactNode {

    return (
      <WizardStepperComponent 
        children={component.children} 
        pageComponents={pageComponents} pages={pages} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      { control: InspectorControlEnum.TextControl, props: { name: 'colorScheme', label: 'Color Scheme' } },
      { control: InspectorControlEnum.TextControl, props: { name: 'orientation', label: 'Orientation' } },
    ];
  }

  getDefaultProps() {
    return { 
      pt: 5, pb: 5, backgroundColor: "blackAlpha.500", 
      colorScheme: "blue", orientation: "horizontal" 
    };
  }

  isContainer() {
    return true;
  }
}
