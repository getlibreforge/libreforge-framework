import { Navigate, useRoutes } from "react-router-dom";
import { IPages } from "@getlibreforge/libreforge-framework-shared";
import { ReactElement, useContext, useEffect } from "react";
import ApplicationPage from "../ApplicationPage";
import { InversifyContainerProviderContext } from "../utils";
import { AbstractCallbackHandler, SYMBOL_CALLBACK_PROVIDER } from "../callbacks";
import CallbackHandlerPage from "../callbacks/CallbackHandlerPage";
import { useNavigate } from 'react-router-dom';

type RoutesProps = {
  pages: IPages;
  designMode: boolean;
  designSelectedPage?: string;
  wrapperComponent?: ReactElement;
  wrapperContainer?: ReactElement;
  routeToUrl: string | undefined;
}

export const Routes: React.FC<RoutesProps> = ({ pages, designMode, designSelectedPage, wrapperComponent, wrapperContainer, routeToUrl }) => {
  const defaultPage = !!designSelectedPage ? designSelectedPage: "home";

  const router = useNavigate();
  const container = useContext(InversifyContainerProviderContext);
  const webhooks = container.getAll<AbstractCallbackHandler>(SYMBOL_CALLBACK_PROVIDER) || [];
  const webhookRoutes = webhooks.map(hook => {
    return { path: `/callback${hook.getRoute()}`, element: <CallbackHandlerPage designMode={designMode} handler={hook} /> }
  })

  /* This block of code is used by Designer to force location change in design mode */
  useEffect(() => {
    if (!!routeToUrl) {
      router(routeToUrl);
    }

  }, [routeToUrl]);

  return useRoutes([
    { path: '/', element: <ApplicationPage pages={pages} designMode={designMode} overridePageName={defaultPage} 
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer} /> },
    { path: '/:pageName', element: <ApplicationPage pages={pages} designMode={designMode} 
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer} /> },
    { path: "*", element: <Navigate to='/' replace /> },
    ...webhookRoutes
  ]);
}
