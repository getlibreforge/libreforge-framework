import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { IComponents } from '@getlibreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps } from '../../../utils/CustomPropsMapper';

const WizardStepComponent = forwardRef((props: { componentId: string, title: string, description: string, 
  pageComponents: IComponents }, ref) => {

  const elementProps = cleanupCustomComponentProps(props);

  return (
    <Step key={`step-${props.componentId}`} ref={ref} {...elementProps}>
      <StepIndicator>
        <StepStatus
          complete={<StepIcon />}
          incomplete={<StepNumber />}
          active={<StepNumber />}
        />
      </StepIndicator>

      <Box flexShrink='0'>
        <StepTitle>{props.title}</StepTitle>
        <StepDescription>{props.description}</StepDescription>
      </Box>

      <StepSeparator />
    </Step>
  )
});

export default WizardStepComponent;
