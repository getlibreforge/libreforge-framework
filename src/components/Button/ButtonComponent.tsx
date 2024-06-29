import { Button } from '@chakra-ui/react';
import { useActionHandlers } from '../../hooks/useActionHandlers';
import { iconsList } from '../../iconsList';
import { forwardRef } from 'react';
import { IComponents, IPages } from '@libreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps } from '../../utils/CustomPropsMapper';

const ButtonComponent = forwardRef((props: { componentId: string, pages: IPages, 
    pageComponents: IComponents, componentPage: string, collectionRefIdx: number | undefined }, ref) => {

  const actionGroup = props.pageComponents[props.componentId].actionGroup;
  let targetProps = useActionHandlers(props, actionGroup);

  if (targetProps.leftIcon) {
    if (Object.keys(iconsList).includes(targetProps.leftIcon)) {
      const Icon = iconsList[targetProps.leftIcon as keyof typeof iconsList];
      targetProps.leftIcon = <Icon path="" />;
    } else {
      targetProps.leftIcon = undefined;
    }
  }

  if (targetProps.rightIcon) {
    if (Object.keys(iconsList).includes(targetProps.rightIcon)) {
      const Icon = iconsList[targetProps.rightIcon as keyof typeof iconsList];
      targetProps.rightIcon = <Icon path="" />;
    } else {
      targetProps.rightIcon = undefined;
    }
  }

  const elementProps = cleanupCustomComponentProps(targetProps)
  return <Button ref={ref} {...elementProps} />;
});

export default ButtonComponent;
