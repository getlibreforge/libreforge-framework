import React from 'react';
import {forwardRef} from '@chakra-ui/react';
import {useActionHandlers, usePageStateValueByComponentRef} from '../hooks';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps } from '../utils/CustomPropsMapper';

const PreviewComponent = forwardRef(
  (props: { componentId: string; _x_name: string; pageComponents: IComponents; type: any, overridenComponentPageState: any }, ref) => {

    const value = usePageStateValueByComponentRef(props._x_name, props.overridenComponentPageState);
    let propsElement = useActionHandlers({ ...props, ref, ...value });    
    const { type } = props;

    const elementProps = cleanupCustomComponentProps(propsElement)
    return React.createElement(type, {
        ...elementProps,
        ref,
    });
  },
);

export default PreviewComponent;
