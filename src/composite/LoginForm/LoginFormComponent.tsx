import { Box } from '@chakra-ui/react';
import ComponentPreview from '../../components/ComponentPreview';
import { forwardRef } from 'react';

const LoginFormComponent = forwardRef((props: any, ref) => {
  const { children, designMode, designModeInteractivityDisabled, pageComponents, pages, ...boxProps } = props;

  return (
    <Box ref={ref} {...boxProps}>
      {children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} overridenComponentPageState={undefined}
          designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
          pageComponents={pageComponents} pages={pages} collectionRefIdx={undefined} />
      ))}
    </Box>
  );
});

export default LoginFormComponent;
