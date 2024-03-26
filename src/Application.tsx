import { ReactElement } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { IPages } from "@getlibreforge/libreforge-framework-shared"
import { SnackbarProvider } from "notistack";
import { Routes } from './routes';
import { BrowserRouter } from "react-router-dom";

type ApplicationProps = {
  pages: IPages;
  designMode: boolean;
  designSelectedPage?: string;
  wrapperComponent?: ReactElement; 
  wrapperContainer?: ReactElement;
  routeToUrl: string | undefined;
}

export const Application = (props: ApplicationProps) => {
  const { pages, designMode, designSelectedPage, wrapperComponent, wrapperContainer, routeToUrl } = props;

  return (
    <ChakraProvider resetCSS>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Routes pages={pages} designMode={designMode} designSelectedPage={designSelectedPage}
            wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer} routeToUrl={routeToUrl}
          />
        </BrowserRouter>
      </SnackbarProvider>
    </ChakraProvider>
  );
};
