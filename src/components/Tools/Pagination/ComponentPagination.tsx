import React, { ReactElement, forwardRef, memo, useContext } from 'react';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps } from '../../../utils/CustomPropsMapper';
import { Stack } from '@chakra-ui/react';
import { Button } from "@chakra-ui/react";
import { HStack, IconButton } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useDispatch, usePageStateValueByComponentRef } from '../../../hooks';
import { useSelector } from 'react-redux';
import { getCurrentPageState } from '../../../core';
import { InversifyContainerProviderContext, ProviderFactory } from '../../../utils';
import { ACTION_CLICK_BY_REF, ARG_COMPONENT_REF_ID, ActionExecutionContext } from '../../../actions';

type ComponentPaginationProps = {
  submitButtonRef: string;
  collectionRef: string;
  componentId: string;
  pageComponents: IComponents;
  designMode: boolean;  
  wrapperComponent?: ReactElement; wrapperContainer?: ReactElement;

  pageSize: number;
  margin?: number;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "solid" | "ghost" | "outline" | "link";
  selectedVariant?: "solid" | "ghost" | "outline" | "link";
  previousIcon?: React.ReactElement;
  nextIcon?: React.ReactElement;
  colorScheme?: string;
  fontWeight:
    | "hairline"
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  borderRadius:
    | "none"
    | "sm"
    | "base"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "full";  
}

const ComponentPagination = forwardRef((props: ComponentPaginationProps, ref) => {
  const { componentId, pageComponents, designMode, wrapperComponent, wrapperContainer, 
    collectionRef, submitButtonRef, pageSize, margin = 1, size = "md", selectedVariant = "solid",
    variant = "outline", previousIcon = <ChevronLeftIcon />, nextIcon = <ChevronRightIcon />,
    colorScheme = "gray", fontWeight = "light", borderRadius = "md", ...rest} = props;  

  const container = useContext(InversifyContainerProviderContext);
  const factory = new ProviderFactory(container);
  const dispatch = useDispatch();
  const currentPageState = useSelector(getCurrentPageState);
  const attributePage = `${componentId}_page`;
  const attributeCollectionTotal = `_meta_total_${collectionRef}`;
  const collectionTotal = currentPageState[attributeCollectionTotal] || 0;
  const collectionLength = !!currentPageState[collectionRef] ? currentPageState[collectionRef].length: 0;
  const page = usePageStateValueByComponentRef(attributePage).value || 0;
  const total = Math.max(collectionTotal, collectionLength, pageSize);

  const cleanedProps = cleanupCustomComponentProps({...props, pos: 'relative', ref });  
  const numberOfPages = Math.ceil(total / pageSize);

  const handlePageClick = async (i: number) => {
    let newPage = i;
    if (i >= numberOfPages - 1) {
      newPage = numberOfPages - 1;
    } else if (i <= 0) {
      newPage = 0;
    }

    await dispatch.app.changeCurrentPageState({ name: attributePage, value: newPage });

    /* Click on Submit Button */
    const clickByRef = factory.getActionHandlerByName(ACTION_CLICK_BY_REF); 

    const actionExecutionContext: ActionExecutionContext = {
      componentId, dispatch, container, 
      args: { [ARG_COMPONENT_REF_ID]: submitButtonRef }, pageComponents: props.pageComponents, currentPageState, 
      snackbar: undefined, router: undefined, sharedState: undefined, collectionRefIdx: undefined, prevExecutionState: undefined
    }
    await clickByRef?.execute(actionExecutionContext);
  };

  const shouldRender = (idx: number) =>
    idx == page ||
    Math.abs(idx - page) <= margin ||
    idx === numberOfPages - 1 ||
    idx === 0;

  const shouldRenderEllipsis = (idx: number) =>
    idx == page || Math.abs(idx - page) === margin + 1;

  return (
    <Stack p={5} {...cleanedProps}>
      <HStack>
        <IconButton
          {...rest}
          fontWeight={fontWeight}
          borderRadius={borderRadius}
          size={size}
          variant={variant}
          aria-label="previous"
          icon={previousIcon}
          onClick={e => {
            e.preventDefault();
            handlePageClick(page - 1);
          }}
          colorScheme={colorScheme}
        />
        {Array(numberOfPages)
          .fill(0)
          .map((_, i) => {
            return shouldRender(i) ? (
              <Button
                key={i}
                {...rest}
                fontWeight={fontWeight}
                borderRadius={borderRadius}
                size={size}
                variant={page == i ? selectedVariant : variant}
                onClick={e => {
                  e.preventDefault();
                  handlePageClick(i);
                }}
                colorScheme={colorScheme}
              >
                {i + 1}
              </Button>
            ) : shouldRenderEllipsis(i) ? (
              <Button
                key={i}
                {...rest}
                fontWeight={fontWeight}
                borderRadius={borderRadius}
                size={size}
                variant={variant}
                pointerEvents="none"
                colorScheme={colorScheme}
              >
                ...
              </Button>
            ) : (
              <React.Fragment key={i}></React.Fragment>
            );
          })}
        <IconButton
          {...rest}
          fontWeight={fontWeight}
          borderRadius={borderRadius}
          aria-label="next"
          icon={nextIcon}
          onClick={e => {
            e.preventDefault();
            handlePageClick(page + 1);
          }}
          size={size}
          variant={variant}
          colorScheme={colorScheme}
        />
      </HStack>
    </Stack>
  );
});

export default memo(ComponentPagination);
