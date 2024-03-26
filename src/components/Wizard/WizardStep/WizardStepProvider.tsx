import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../../StandardComponentProvider';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { IoFootsteps } from "react-icons/io5";
import WizardStepComponent from './WizardStepComponent';

@injectable()
export class WizardStepProvider extends StandardComponentProvider {

  type = 'WizardStep';

  getCategory(): ComponentCategory {
    return "wizard";
  }

  getIcon() {
    return <IoFootsteps />
  }

  getName() {
    return this.type;
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

      return (
      <WizardStepComponent 
        componentId={component.id} pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [ 
      { control: InspectorControlEnum.TextControl, props: { name: 'title', label: 'Title' } },
      { control: InspectorControlEnum.TextControl, props: { name: 'description', label: 'Description' } },
    ];
  }

  getDefaultProps() {
    return { title: 'Step', description: 'Description' };
  }

  isContainer() {
    return false;
  }
}
