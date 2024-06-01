import { Box } from '@chakra-ui/react';
import ChildComponentRenderer from '../../components/ChildComponentRenderer';
import { forwardRef } from 'react';

const AddressFormComponent = forwardRef((props: any, ref) => {
  const { children, designMode, designModeInteractivityDisabled, pageComponents, pages, ...boxProps } = props;

  return (
    <Box ref={ref} {...boxProps}>
      {children.map((key: string) => (
        <ChildComponentRenderer key={key} componentName={key} overridenComponentPageState={undefined}
          designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
          pageComponents={pageComponents} pages={pages} collectionRefIdx={undefined} />
      ))}
    </Box>
  );
});

export default AddressFormComponent;
