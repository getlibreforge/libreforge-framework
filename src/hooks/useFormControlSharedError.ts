import { useSelector } from 'react-redux';
import { getSharedErrorMessage } from '../core/selectors/app';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import { ComponentClass, FunctionComponent } from 'react';
import * as Chakra from '@chakra-ui/react';

const ALLOWED_CHILD = ['BusinessMsg'];

export const useFormControlSharedError = (
  type: string | FunctionComponent<any> | ComponentClass<any, any>,
  children: string[],
  pageComponents: IComponents,  
  designMode: boolean,
  props: any
): any => {
  
  if (true === designMode || type !== Chakra['FormControl']) {
    return props;
  }

  const sharedErrorMessage = useSelector(getSharedErrorMessage);

  const bruleChildren = children.map(id => {
    return pageComponents[id]
  }).filter(item => ALLOWED_CHILD.indexOf(item.type) > -1)

  if (bruleChildren.length > 0) {
    if (!!sharedErrorMessage) {
      return { ...props, isInvalid: true };
    }
  }

  return props;
};
