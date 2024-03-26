import { forwardRef } from 'react';
import { useFormErrorMessage } from '../../hooks/useFormErrorMessage';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps } from '../../utils/CustomPropsMapper';
import React from 'react';
import * as Chakra from '@chakra-ui/react';

const FormErrorMessageComponent = forwardRef((props: { 
    componentId: string; pageComponents: IComponents; designMode: boolean }, ref) => {
  
  const propsElement = useFormErrorMessage(props.componentId, props.pageComponents, props.designMode, props);
  const elementProps = cleanupCustomComponentProps(propsElement)
  
  return React.createElement(Chakra['FormErrorMessage'], {
      ...elementProps,
      ref,
  });
});

export default FormErrorMessageComponent;
