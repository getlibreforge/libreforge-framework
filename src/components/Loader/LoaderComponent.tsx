import { forwardRef } from 'react';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps } from '../../utils/CustomPropsMapper';
import React from 'react';
import * as Chakra from '@chakra-ui/react';
import { useGlobalLoaderEnabled } from '../../hooks/useGlobalLoaderEnabled';

const LoaderComponent = forwardRef((props: { componentId: string, _x_name: string, pageComponents: IComponents, designMode: boolean }, ref) => {

  let propsElement = useGlobalLoaderEnabled(props.designMode, { ...props, ref });

  const elementProps = cleanupCustomComponentProps(propsElement)
  return React.createElement(Chakra['Progress'], {
      ...elementProps,
      ref,
  });
});

export default LoaderComponent;
