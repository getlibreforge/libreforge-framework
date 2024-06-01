import React, { ComponentClass, FunctionComponent, ReactElement, forwardRef, memo } from 'react';
import ChildComponentRenderer from '../../ChildComponentRenderer';
import { IComponents, IPages } from '@libreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps } from '../../../utils/CustomPropsMapper';
import { Container, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getCurrentPageState } from '../../../core';

type ComponentForEachProps = {
  children: string[];
  collectionRef: string;
  pageComponents: IComponents;
  pages: IPages;
  designMode: boolean;
  designModeInteractivityDisabled: boolean,
  type: string | FunctionComponent<any> | ComponentClass<any, any>;
  wrapperComponent?: ReactElement; wrapperContainer?: ReactElement;
}

const ComponentForEach = forwardRef((props: ComponentForEachProps, ref) => {
  const { children, pageComponents, pages, designMode, designModeInteractivityDisabled, 
    collectionRef, wrapperComponent, wrapperContainer } = props;  

  const pageState = useSelector(getCurrentPageState);
  let collection: any[] = [];
  if (true === designMode) {
    collection = [{}]; // 1 empty row to render components once in design mode
  } else {
    collection = !!collectionRef ? pageState[collectionRef] || []: [];
  }

  const cleanedProps = cleanupCustomComponentProps({...props, pos: 'relative', ref });  

  return (
    <Stack direction="column" {...cleanedProps} >
      {collection.map((row: any, index: number) => {
        return (
          <Container width="100%" maxWidth="100%">
            {children.map((key: string) => {
              return (
                <ChildComponentRenderer key={key} componentName={key} 
                    overridenComponentPageState={row} collectionRefIdx={index}
                    designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
                    pageComponents={pageComponents}
                    pages={pages} wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer} 
                />
              )
            })}
          </Container>          
        )
      })}
    </Stack>
  );
});

export default memo(ComponentForEach);
