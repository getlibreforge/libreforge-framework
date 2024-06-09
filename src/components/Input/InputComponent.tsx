import { useActionHandlers } from '../../hooks/useActionHandlers';
import { forwardRef } from 'react';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps } from '../../utils/CustomPropsMapper';
import { usePageStateValueByComponentRef } from '../../hooks';
import React from 'react';
import * as Chakra from '@chakra-ui/react';
import { useHiddenByComponentRef } from '../../hooks/useHiddenByComponentRef';

const InputComponent = forwardRef(
  (props: { componentId: string; _x_name: string; pageComponents: IComponents; type: any, overridenComponentPageState: any }, ref) => {

    const value = usePageStateValueByComponentRef(props._x_name, props.overridenComponentPageState);
    const hidden = useHiddenByComponentRef(props._x_name, props.overridenComponentPageState);
    
    let propsElement = useActionHandlers({ ...props, ref, ...value, ...hidden });    

    const elementProps = cleanupCustomComponentProps(propsElement)
    return React.createElement(Chakra['Input'], {
        ...elementProps,
        ref,
    });
});

export default InputComponent;
