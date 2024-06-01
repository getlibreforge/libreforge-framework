import 'reflect-metadata';
import { ReactElement, ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import ContainerComponent from '../../components/ContainerComponent';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { BsGrid3X2Gap } from "react-icons/bs";

@injectable()
export class GridProvider extends StandardComponentProvider {
  
  type = 'Grid';

  getCategory(): ComponentCategory {
    return "layout";
  }

  getIcon() {
    return <BsGrid3X2Gap />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
      designMode: boolean, designModeInteractivityDisabled: boolean, forwardedProps: any,
      overridenComponentPageState: any, collectionRefIdx: number | undefined,
      wrapperComponent?: ReactElement, wrapperContainer?: ReactElement): ReactNode {

    return (
      <ContainerComponent type={Chakra['Grid']} children={component.children}
        pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'templateColumns', label: 'Template Columns' },
      },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'templateRows', label: 'Template Rows' },
      },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'gap', label: 'Gap' },
      },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'rowGap', label: 'Row Gap' },
      },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'columnGap', label: 'Column Gap' },
      },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'autoColumns', label: 'Auto Columns' },
      },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'column', label: 'Column' },
      },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'row', label: 'Row' },
      },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'autoFlow', label: 'Auto Flow' },
      },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'autoRows', label: 'Auto Rows' },
      },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'area', label: 'Area' },
      },
      {
        control: InspectorControlEnum.TextControl,
        props: { name: 'templateAreas', label: 'Template Area' },
      },
    ];
  }

  getDefaultProps() {
    return { templateColumns: 'repeat(5, 1fr)', gap: 1, pt: 5, pb: 5, backgroundColor: "blackAlpha.500" }
  }

  isContainer() {
    return true;
  }
}
