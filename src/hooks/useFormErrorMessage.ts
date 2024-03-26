import { IComponents } from '@libreforge/libreforge-framework-shared';
import { ComponentUtils } from '../utils';
import { useSelector } from 'react-redux';
import { getCurrentPageState } from '../core';

const ALLOWED_CHILD = ['Input', 'PasswordInput', 'Textarea', 'Checkbox', 'LocalDate', 'Select'];

export const useFormErrorMessage = (
  componentId: string, 
  pageComponents: IComponents,  
  designMode: boolean,
  props: any
): any => {
  
  if (true === designMode) {
    return props;
  }

  const currentPageState = useSelector(getCurrentPageState);  
  const formErrors = currentPageState['formErrors'];  
  const utils = new ComponentUtils();
  const current = pageComponents[componentId];

  /* Get form control */
  const formControl = utils.getParentOfType(current, 'FormControl', pageComponents);
  if (!formControl) {
    console.warn('Parent FormControl component not found');
    return props;
  }

  /* Get form control child components */
  const formChildren = formControl.children.map(id => {
    return pageComponents[id]
  }).filter(item => ALLOWED_CHILD.indexOf(item.type) > -1);

  if (formChildren.length > 0) {
    for (let i=0; i<formChildren.length; i++) {
      const errorId = formChildren[i].id;
      const errorMessage = formErrors[errorId];

      if (!!errorMessage) {
        return { ...props, children: errorMessage };
      }
    }
  }

  return props;
};
