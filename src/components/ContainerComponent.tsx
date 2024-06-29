import React, { ComponentClass, FunctionComponent, ReactElement, forwardRef, memo } from 'react';
import ChildComponentRenderer from './ChildComponentRenderer';
import { IComponents, IPages } from '@libreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps } from '../utils/CustomPropsMapper';
import { useFormControlError } from '../hooks';
import { useFormControlSharedError } from '../hooks/useFormControlSharedError';

type ContainerComponentProps = {
  overridenComponentPageState: any;
  collectionRefIdx: number | undefined;
  children: string[];
  pageComponents: IComponents;
  pages: IPages;
  designMode: boolean;
  designModeInteractivityDisabled: boolean,
  type: string | FunctionComponent<any> | ComponentClass<any, any>;
  wrapperComponent?: ReactElement; wrapperContainer?: ReactElement;
}

const ContainerComponent = forwardRef((props: ContainerComponentProps, ref) => {
  const { type, overridenComponentPageState, collectionRefIdx, children, pageComponents, pages, designMode, designModeInteractivityDisabled, wrapperComponent, wrapperContainer } = props;
  
  const formErrorProps = { ...useFormControlError(type, children, pageComponents, designMode, props), pos: 'relative', ref };
  const sharedErrorProps = useFormControlSharedError(type, children, pageComponents, designMode, formErrorProps);
  const cleanedProps = cleanupCustomComponentProps(sharedErrorProps);  

  return React.createElement(
    type,
    cleanedProps, 
    children.map((key: string) => {
      return (
        <ChildComponentRenderer key={key} componentName={key} overridenComponentPageState={overridenComponentPageState}
          designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
          pageComponents={pageComponents} collectionRefIdx={collectionRefIdx} 
          pages={pages} wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer} />        
      )
    }),
  );
});

export default memo(ContainerComponent);
