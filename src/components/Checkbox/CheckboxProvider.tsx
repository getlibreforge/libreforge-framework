import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { GoCheckbox } from "react-icons/go";
import CheckboxComponent from './CheckboxComponent';

@injectable()
export class CheckboxProvider extends StandardComponentProvider {

  type = 'Checkbox';

  getCategory(): ComponentCategory {
    return "fields";
  }

  getIcon() {
    return <GoCheckbox />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {
    return (
      <CheckboxComponent
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        {...component.props} {...forwardedProps} componentId={component.id}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      { control: InspectorControlEnum.ChildrenControl, props: {} },
      {
        control: InspectorControlEnum.SwitchControl,
        props: { name: 'isChecked', label: 'Checked?' },
      },
      {
        control: InspectorControlEnum.ColorsControl,
        props: { name: 'colorScheme', label: 'Color Scheme' },
      },
      {
        control: InspectorControlEnum.SizeControl,
        props: { name: 'size', label: 'Size' },
      },
      {
        control: InspectorControlEnum.ValidationControl,
        props: { name: '_x_rule', label: 'Validation' },
      },      
    ];
  }

  getDefaultProps() {
    return { 
      children: 'Label checkbox', isReadOnly: false, isChecked: false
    };
  }

  isContainer() {
    return false;
  }
}
