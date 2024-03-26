import { Checkbox, Input } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { IPages } from '@libreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps } from '../../utils/CustomPropsMapper';
import { usePageStateValueByComponentRef } from '../../hooks';
import { useDateActions } from '../../hooks/useDateActions';

const LocalDateComponent = forwardRef((props: { componentId: string, _x_name: string, pages: IPages, componentPage: string }, ref) => {

  const propsWithOnChange = useDateActions(props);  
  const propsWithCleanup = cleanupCustomComponentProps(propsWithOnChange);

  const value = usePageStateValueByComponentRef(props._x_name).value;

  return (
    <Input
      {...propsWithCleanup}
      size="md"
      type="date"
      value={value}
    />
  );
});

export default LocalDateComponent;
