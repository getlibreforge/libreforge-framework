import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import SelectPreview from './SelectPreview';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { GoMultiSelect } from "react-icons/go";

@injectable()
export class SelectProvider extends StandardComponentProvider {
  
  type = 'Select';

  getCategory(): ComponentCategory {
    return "fields";
  }

  getIcon() {
    return <GoMultiSelect />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

    return (
      <SelectPreview
        designMode={designMode} collectionRefIdx={collectionRefIdx}
        designModeInteractivityDisabled={designModeInteractivityDisabled}
        {...component.props} {...forwardedProps} componentId={component.id}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      {
        control: InspectorControlEnum.SizeControl,
        props: { name: 'size', label: 'Size' },
      },
      {
        control: InspectorControlEnum.IconControl,
        props: { name: 'icon', label: 'Icon' },
      },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'iconSize', label: 'Icon Size' },
      },
      {
        control: InspectorControlEnum.VariantsControl,
        props: { name: 'variant', label: 'Variant' },
      },
      {
        control: InspectorControlEnum.DictionaryChangeControl,
        props: { name: '_x_dict', label: 'Dictionary' },
      },
      {
        control: InspectorControlEnum.ValidationControl,
        props: { name: '_x_rule', label: 'Validation' },
      },      
    ];
  }

  getDefaultProps() {
    return { 
      icon: 'ChevronDownIcon', variant: 'outline', size: 'md'
    };
  }

  isContainer() {
    return false;
  }
}
