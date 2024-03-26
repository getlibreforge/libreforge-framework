import { ReactElement, forwardRef, memo } from 'react';
import { IComponent, IComponents, IPages } from '@libreforge/libreforge-framework-shared';
import ComponentPreview from '../../ComponentPreview';
import { Box } from '@chakra-ui/react';

const ComponentRefComponent = forwardRef((props: { componentId: string, collectionRefIdx: number | undefined, title: string, description: string, 
  pageComponents: IComponents, pages: IPages, designMode: boolean, wrapperComponent?: ReactElement, wrapperContainer?: ReactElement,
  _x_page_ref: string, _x_comp_ref: string }, ref) => {

  const namePageRef = props._x_page_ref;
  const nameComponentRef = props._x_comp_ref;
  const pageRef: IComponents = props.pages[namePageRef];

  const componentRef: IComponent | undefined = !!pageRef ? pageRef[nameComponentRef]: undefined;

  if (!!componentRef) {
    return (
      //@ts-ignore
      <Box ref={ref}>
        <ComponentPreview key={componentRef.id} overridenComponentPageState={undefined}
          designMode={props.designMode} designModeInteractivityDisabled={true} collectionRefIdx={props.collectionRefIdx}
          componentName={componentRef.id} pageComponents={props.pageComponents} pages={props.pages}
          wrapperComponent={props.wrapperComponent} wrapperContainer={props.wrapperContainer}
        />
      </Box>
    )
  } else {
    return (
      <>
        {`Component ${pageRef}/${componentRef} not found`}
      </>
    )    
  }
});

export default memo(ComponentRefComponent);
