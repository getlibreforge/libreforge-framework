import 'reflect-metadata';
import React, { ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { CompositeComponentProvider } from '../CompositeComponentProvider';
import Composer, { ComposedComponent } from '../../utils/Composer';
import LoginFormComponent from './LoginFormComponent';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { AiOutlineBuild } from 'react-icons/ai';

@injectable()
export class LoginFormProvider extends CompositeComponentProvider {
  
  type = 'Address';

  getCategory(): ComponentCategory {
    return "blocks";
  }

  getIcon() {
    return <AiOutlineBuild />
  }

  getName() {
    return this.type;
  }  

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, designMode: boolean, designModeInteractivityDisabled: boolean, forwardedProps: any): ReactNode {

    return (
      <LoginFormComponent children={component.children}
        pageComponents={pageComponents} pages={pages} 
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        {...component.props} {...forwardedProps}
      />
    );
  }

  build(parent: string): ComposedComponent {
    const composer = new Composer();

    const nodeId = composer.addNode({
      type: 'Container',
      parent,
    });
    composer.addNode({
      type: 'Button',
      parent: nodeId,
      props: { children: 'Login' },
    });

    const components = composer.getComponents();
    return {
      components,
      root: nodeId,
      parent,
    };
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [];
  }

  getDefaultProps() {
    return {};
  }

  isContainer() {
    return false;
  }
}
