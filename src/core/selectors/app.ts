import { RootState } from '../models';

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

export const getLastApplicationEvent = (state: RootState) =>
  state.app.sharedState._lastApplicationEvent;

export const getLastBusinessRulesExecutionTime = (state: RootState) =>
  state.app.sharedState._lastBusinessRulesExecutionTime;