import React, { ReactElement, forwardRef, memo } from 'react';
import ComponentPreview from '../../ComponentPreview';
import { IComponents, IPages } from '@libreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps } from '../../../utils/CustomPropsMapper';
import * as Chakra from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getWizardStep } from '../../../core';

type WizardStepperComponentProps = {
  children: string[];
  collectionRefIdx: number | undefined;
  pageComponents: IComponents;
  pages: IPages,
  designMode: boolean;
  designModeInteractivityDisabled: boolean;
  wrapperComponent?: ReactElement; wrapperContainer?: ReactElement;
}

const WizardStepperComponent = forwardRef((props: WizardStepperComponentProps, ref) => {
  const { children, collectionRefIdx, pageComponents, pages, designMode, designModeInteractivityDisabled, wrapperComponent, wrapperContainer } = props;
  
  const currentStep = useSelector(getWizardStep);  
  const cleanedProps = cleanupCustomComponentProps({ ...props, index: currentStep, ref });

  return React.createElement(
    Chakra['Stepper'],
    cleanedProps, 
    children.map((key: string) => {
      return (
        <ComponentPreview key={key} componentName={key} overridenComponentPageState={undefined}
          designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
          pageComponents={pageComponents} pages={pages} collectionRefIdx={collectionRefIdx}
          wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer} />        
      )
    }),
  );
});

export default memo(WizardStepperComponent);
