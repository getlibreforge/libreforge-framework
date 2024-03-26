import { Container } from 'inversify';
import { createContext } from 'react';

export const InversifyContainerProviderContext = createContext(new Container());
