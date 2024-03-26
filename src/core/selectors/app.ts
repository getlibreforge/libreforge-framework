import { RootState } from '../models';

export const getDictionaries = (state: RootState) => {
  const { dictionaries } = state.app.sharedState;

  if (!dictionaries) {
    return [];
  }

  return Object.keys(dictionaries).map(key => {
    const dict = dictionaries[key];

    return { code: dict.code, name: dict.name, filtersCount: dict.filtersCount, items: dict.items };
  });
};

export const getDictionariesObject = (state: RootState) => state.app.sharedState.dictionaries

export const getAppState = (state: RootState) => state.app;

export const getCurrentPageState = (state: RootState) =>
  state.app.currentPageState;

export const getSharedState = (state: RootState) =>
  state.app.sharedState;

export const getGlobalLoaderEnabled = (state: RootState) =>
  state.app.sharedState.globalLoader;

export const getSharedErrorMessage = (state: RootState) =>
  state.app.sharedState.errorMessage;  

export const getWizardStep = (state: RootState) =>
  state.app.sharedState.wizardStep;