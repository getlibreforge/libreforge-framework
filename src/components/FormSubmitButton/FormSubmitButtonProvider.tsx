import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@getlibreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import FormSubmitButtonComponent from './FormSubmitButtonComponent';
import { IComponent, IComponents } from "@getlibreforge/libreforge-framework-shared"
import { MdOutlineSmartButton } from 'react-icons/md';

@injectable()
export class FormSubmitButtonProvider extends StandardComponentProvider {

  type = 'SubmitButton';

  getCategory(): ComponentCategory {
    return "forms";
  }

  getIcon() {
    return <MdOutlineSmartButton />
  }

  getName() {
    return this.type;
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {
    return (
      <FormSubmitButtonComponent
        componentId={component.id} 
        pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      { control: InspectorControlEnum.ChildrenControl, props: {} },
      { control: InspectorControlEnum.SizeControl, props: { name: 'size', label: 'Size' } },
      { control: InspectorControlEnum.VariantsControl, props: { name: 'variant', label: 'Variant' } },
      { control: InspectorControlEnum.ColorsControl, props: { name: 'colorScheme', label: 'Color Scheme' } },
      { control: InspectorControlEnum.IconControl, props: { name: 'leftIcon', label: 'Left Icon' } },
      { control: InspectorControlEnum.IconControl, props: { name: 'rightIcon', label: 'Right Icon' }, },
      { control: InspectorControlEnum.TextControl, props: { name: '_x_url', label: 'URL' } },
      { control: InspectorControlEnum.TextControl, props: { name: '_x_method', label: 'Method' } },      
      { control: InspectorControlEnum.ActionChangeControl, props: { name: '_x_onclick_1', label: 'onClick #1' } },
      { control: InspectorControlEnum.ActionChangeControl, props: { name: '_x_onclick_2', label: 'onClick #2' } }, 
      { control: InspectorControlEnum.ActionChangeControl, props: { name: '_x_onclick_3', label: 'onClick #3' } },           
    ];
  }

  getDefaultProps() {
    return { children: 'Submit', variant: 'solid', size: 'md',
            _x_url: "/auth/login", _x_method: "POST" };
  }

  isContainer() {
    return false;
  }
}
