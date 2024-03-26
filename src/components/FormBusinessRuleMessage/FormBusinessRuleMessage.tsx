import { forwardRef } from 'react';
import { IComponents } from '@getlibreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps } from '../../utils/CustomPropsMapper';
import * as Chakra from '@chakra-ui/react';
import React from 'react';
import { useSharedError } from '../../hooks/useSharedError';

const FormBusinessRuleMessage = forwardRef((props: { componentId: string, pageComponents: IComponents, designMode: boolean }, ref) => {

  const propsMessage = useSharedError(props.designMode, { ...props, ref });
  const propsCleaned = cleanupCustomComponentProps(propsMessage)

  return React.createElement(Chakra['FormErrorMessage'], {
      ...propsCleaned,
      ref,
  });  
});

export default FormBusinessRuleMessage;
