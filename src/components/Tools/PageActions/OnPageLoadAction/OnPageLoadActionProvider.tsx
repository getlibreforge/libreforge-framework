import 'reflect-metadata';
import { ReactElement, ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@getlibreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../../../StandardComponentProvider';
import { IComponent, IComponents } from "@getlibreforge/libreforge-framework-shared"
import { VscGithubAction } from "react-icons/vsc";
import OnPageLoadActionComponent from './OnPageLoadActionComponent';

@injectable()
export class OnPageLoadActionProvider extends StandardComponentProvider {

  type = 'OnPageLoad';

  getCategory(): ComponentCategory {
    return "tools";
  }

  getIcon() {
    return <VscGithubAction />
  }

  getName() {
    return this.type;
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
      designMode: boolean, designModeInteractivityDisabled: boolean, 
      forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined,
      wrapperComponent?: ReactElement, wrapperContainer?: ReactElement): ReactNode {

    return (
      <OnPageLoadActionComponent 
        componentId={component.id} pageComponents={pageComponents} 
        designMode={designMode} pages={pages} collectionRefIdx={collectionRefIdx}
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [ 
      { control: InspectorControlEnum.ActionChangeControl, props: { name: '_x_action', label: 'Action' } },
    ];
  }

  getDefaultProps() {
    return { w: '28px', color: 'messenger.900' };
  }

  isContainer() {
    return false;
  }
}
