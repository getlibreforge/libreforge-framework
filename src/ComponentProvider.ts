import 'reflect-metadata';
import { injectable } from 'inversify';
import { ReactElement, ReactNode } from 'react';
import { IPages, InspectorControlEnum } from "@libreforge/libreforge-framework-shared"
import { ComponentCategory, IComponent, IComponents } from "@libreforge/libreforge-framework-shared"

export const SYMBOL_COMPONENT_PROVIDER = 'ComponentProvider';

@injectable()
export abstract class ComponentProvider {
  abstract getCategory(): ComponentCategory;

  abstract getIcon(): ReactElement;

  abstract getName(): string;  

  abstract getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean,
    forwardedProps: any, 
    overridenComponentPageState: any,
    collectionRefIdx: number | undefined,
    wrapperComponent?: ReactElement, 
    wrapperContainer?: ReactElement): ReactNode;

  abstract getInspectorControls(): {
    control: InspectorControlEnum;
    props: any;
  }[];

  abstract getDefaultProps(): any;

  abstract isComposite(): boolean;

  abstract isContainer(): boolean;
}
