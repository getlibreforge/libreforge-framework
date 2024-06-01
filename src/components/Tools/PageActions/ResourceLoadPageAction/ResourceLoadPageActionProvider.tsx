import 'reflect-metadata';
import { ReactElement, ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../../../StandardComponentProvider';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { MdCloudDownload } from "react-icons/md";
import ResourceLoadPageActionComponent from './ResourceLoadPageActionComponent';

@injectable()
export class ResourceLoadPageActionProvider extends StandardComponentProvider {

  type = 'ResourceLoad';

  getCategory(): ComponentCategory {
    return "tools";
  }

  getIcon() {
    return <MdCloudDownload />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
      designMode: boolean, designModeInteractivityDisabled: boolean, 
      forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined,
      wrapperComponent?: ReactElement, wrapperContainer?: ReactElement): ReactNode {

    return (
      <ResourceLoadPageActionComponent 
        componentId={component.id} pageComponents={pageComponents} 
        designMode={designMode} pages={pages} collectionRefIdx={collectionRefIdx}
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [ 
      { control: InspectorControlEnum.TextControl, props: { name: 'url', label: 'Url' } },
      { control: InspectorControlEnum.TextControl, props: { name: 'variable', label: 'Target Variable' } },
    ];
  }

  getDefaultProps() {
    return { w: '28px', color: 'messenger.900' };
  }

  isContainer() {
    return false;
  }
}
