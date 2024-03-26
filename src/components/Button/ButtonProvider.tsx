import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import ButtonComponent from './ButtonComponent';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { MdOutlineSmartButton } from 'react-icons/md';

@injectable()
export class ButtonProvider extends StandardComponentProvider {

  type = 'Button';

  getCategory(): ComponentCategory {
    return "basic";
  }

  getIcon() {
    return <MdOutlineSmartButton />
  }

  getName() {
    return this.type;
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, forwardedProps: any, 
    overridenComponentPageState: any, collectionRefIdx: number | undefined,): ReactNode {
    return (
      <ButtonComponent
        componentId={component.id} pageComponents={pageComponents} 
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        collectionRefIdx={collectionRefIdx}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      { control: InspectorControlEnum.ChildrenControl, props: {} },
      {
        control: InspectorControlEnum.SizeControl,
        props: { name: 'size', label: 'Size' },
      },
      {
        control: InspectorControlEnum.VariantsControl,
        props: { name: 'variant', label: 'Variant' },
      },
      {
        control: InspectorControlEnum.ColorsControl,
        props: { name: 'colorScheme', label: 'Color Scheme' },
      },
      {
        control: InspectorControlEnum.IconControl,
        props: { name: 'leftIcon', label: 'Left Icon' },
      },
      {
        control: InspectorControlEnum.IconControl,
        props: { name: 'rightIcon', label: 'Right Icon' },
      },
      {
        control: InspectorControlEnum.ActionChangeControl,
        props: { name: '_x_onclick_1', label: 'onClick #1' },
      },
      {
        control: InspectorControlEnum.ActionChangeControl,
        props: { name: '_x_onclick_2', label: 'onClick #2' },
      }, 
      {
        control: InspectorControlEnum.ActionChangeControl,
        props: { name: '_x_onclick_3', label: 'onClick #3' },
      },           
    ];
  }

  getDefaultProps() {
    return { children: 'Button text', variant: 'solid', size: 'md' };
  }

  isContainer() {
    return false;
  }
}
