import React, { ReactElement, memo, useContext } from 'react';
import { ProviderFactory } from '../utils';
import { InversifyContainerProviderContext } from '../utils';
import { ComponentProvider } from '../ComponentProvider';
import { IComponents, IPages } from '@libreforge/libreforge-framework-shared';
import { ComponentUtils } from '../utils';

type ChildComponentRendererProps = {
  overridenComponentPageState: any,
  collectionRefIdx: number | undefined,
  componentName: string;
  pages: IPages;
  pageComponents: IComponents;
  designMode: boolean;
  designModeInteractivityDisabled: boolean;
  wrapperComponent?: ReactElement;
  wrapperContainer?: ReactElement;
}

const ChildComponentRenderer: React.FC<ChildComponentRendererProps> = ({
    componentName, overridenComponentPageState, collectionRefIdx, pageComponents, pages, designMode, designModeInteractivityDisabled, wrapperComponent, wrapperContainer, ...forwardedProps }) => {

  const componentUtils = new ComponentUtils();
  const component = componentUtils.getComponentByName(componentName, pageComponents);

  if (!component) {
    console.error(
      `Child component ${componentName} not found`,
    );
    return null;
  }  

  const container = useContext(InversifyContainerProviderContext);

  const factory = new ProviderFactory(container);
  const componentProvider = factory.getByComponentType<ComponentProvider>(
    component.type,
  );

  if (!componentProvider) {
    console.error(
      `Component provider not found for ${componentName}`,
    );
    return null;
  }

  const reactNode = componentProvider.getComponent(component, pageComponents, pages, designMode, designModeInteractivityDisabled, forwardedProps, overridenComponentPageState, collectionRefIdx, wrapperComponent, wrapperContainer);
  const componentType = componentProvider.isContainer() ? wrapperContainer?.type: wrapperComponent?.type

  if (!!componentType) {
    return React.createElement(
      componentType, { component, designMode, designModeInteractivityDisabled, wrapperComponent, wrapperContainer }, reactNode,
    );

  } else {
    return reactNode;
  }
};

export default memo(ChildComponentRenderer);
