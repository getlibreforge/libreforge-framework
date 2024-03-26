import { useSelector } from 'react-redux';
import { getCurrentPageState } from '../core/selectors/app';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import { ComponentClass, FunctionComponent } from 'react';
import * as Chakra from '@chakra-ui/react';

const ALLOWED_CHILD = ['Input', 'PasswordInput', 'Textarea', 'Checkbox', 'LocalDate', 'Select'];

export const useFormControlError = (
  type: string | FunctionComponent<any> | ComponentClass<any, any>,
  children: string[],
  pageComponents: IComponents,  
  designMode: boolean,
  props: any
): any => {
  
  if (true === designMode || type !== Chakra['FormControl']) {
    return props;
  }

  const currentPageState = useSelector(getCurrentPageState);  
  const formErrors = currentPageState['formErrors'];

  const formChildren = children.map(id => {
    return pageComponents[id]
  }).filter(item => ALLOWED_CHILD.indexOf(item.type) > -1)

  if (formChildren.length > 0) {
    for (let i=0; i<formChildren.length; i++) {
      const errorId = formChildren[i].id;
      const errorValue = formErrors[errorId];

      if (!!errorValue) {
        return { ...props, isInvalid: true };
      }
    }
  }

  return props;
};
