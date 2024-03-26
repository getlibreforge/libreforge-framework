import 'reflect-metadata';
import { ReactElement, ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { StandardComponentProvider } from '../StandardComponentProvider';
import ContainerComponent from '../ContainerComponent';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { AiOutlineForm } from 'react-icons/ai';

@injectable()
export class FormProvider extends StandardComponentProvider {

  type = 'Form';

  getCategory(): ComponentCategory {
    return "forms";
  }

  getIcon() {
    return <AiOutlineForm />
  }

  getName() {
    return this.type;
  }

  getPreview(component: IComponent, pageComponents: IComponents, pages: IPages, 
      designMode: boolean, designModeInteractivityDisabled: boolean, forwardedProps: any, 
      overridenComponentPageState: any, collectionRefIdx: number | undefined,
      wrapperComponent?: ReactElement, wrapperContainer?: ReactElement): ReactNode {

    return (
      <ContainerComponent type={Chakra['Container']} children={component.children}
        pageComponents={pageComponents} pages={pages} overridenComponentPageState={overridenComponentPageState}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer} collectionRefIdx={collectionRefIdx}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
    ];
  }

  getDefaultProps() {
    return {
      pt: 5, pb: 5, backgroundColor: "blackAlpha.500"
    };
  }

  isContainer() {
    return true;
  }
}
