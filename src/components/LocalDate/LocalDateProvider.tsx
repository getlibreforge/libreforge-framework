import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@getlibreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import { IComponent, IComponents } from "@getlibreforge/libreforge-framework-shared"
import { CiCalendarDate } from "react-icons/ci";
import LocalDateComponent from './LocalDateComponent';

@injectable()
export class LocalDateProvider extends StandardComponentProvider {

  type = 'LocalDate';

  getCategory(): ComponentCategory {
    return "fields";
  }

  getIcon() {
    return <CiCalendarDate />
  }

  getName() {
    return this.type;
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

    return (
      <LocalDateComponent
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        {...component.props} {...forwardedProps}
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
        control: InspectorControlEnum.ValidationControl,
        props: { name: '_x_rule', label: 'Validation' },
      },      
    ];
  }

  getDefaultProps() {
    return { 
      size: "md"
    };
  }

  isContainer() {
    return false;
  }
}
