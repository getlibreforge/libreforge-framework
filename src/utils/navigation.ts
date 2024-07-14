import { createContext } from 'react';

type NavigationCurrentPageProviderContextType = {
    currentRoute: string | undefined,
    setCurrentRoute: (currentRoute?: string) => void
}

export const NavigationCurrentPageProviderContext = createContext<NavigationCurrentPageProviderContextType>({
    currentRoute: undefined,
    setCurrentRoute: (currentRoute?: string) => {}
});
