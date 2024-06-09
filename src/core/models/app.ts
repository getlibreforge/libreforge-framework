import { createModel } from '@rematch/core';

export interface IDictionary {
  code: string;
  name: string;
  filtersCount: number;
  items: { code: string; value: any; filter1: string }[];
}

export interface IDictionaries {
  [code: string]: IDictionary;
}

export type AppState = {
  /* Represents the state, which isn't cleaned on page to page move */
  sharedState: any;

  /* Represents the state, which is cleaned on page to page move */
  currentPageState: any;
};

const DEFAULT_PAGE_STATE = {
    formErrors: {}
};

const DEFAULT_SHARED_STATE = {
  /** 
   * Last Event is used by the Business Rule component to react and understand, 
   * whether rules have to be evaluated 
   */
  _lastApplicationEvent: undefined,
  _lastBusinessRulesExecutionTime: -1,

  globalLoader: false,  
  wizardStep: 0,  
  errorMessage: undefined
};

const DEFAULT_STATE = {
  sharedState: DEFAULT_SHARED_STATE,
  currentPageState: DEFAULT_PAGE_STATE,
} as AppState;

const app = createModel()({
  state: DEFAULT_STATE,
  reducers: {
    cleanCurrentPageState(
      state: AppState,
      payload: {},
    ): AppState {
      return {
        ...state, currentPageState: DEFAULT_PAGE_STATE
      };
    },    
    changeCurrentPageState(
      state: AppState,
      payload: { name: string; value: any },
    ): AppState {
      const { currentPageState } = state;
      return {
        ...state,
        currentPageState: {
          ...currentPageState,
          [payload.name]: payload.value,
        },
      };
    },
    changeCurrentPageStateBulk(
      state: AppState,
      payload: { items: any },
    ): AppState {
      const { currentPageState } = state;

      const targetPageState = {
        ...currentPageState,
      };
      Object.keys(payload.items).forEach((key: string) => {
        targetPageState[key] = payload.items[key];
      });

      return {
        ...state,
        currentPageState: {
          ...targetPageState
        },
      };
    },    
    changeSharedState(
      state: AppState,
      payload: { name: string; value: any },
    ): AppState {
      const { sharedState } = state;
      return {
        ...state,
        sharedState: {
          ...sharedState,
          [payload.name]: payload.value,
        },
      };
    },
    changeSharedStateBulk(
      state: AppState,
      payload: { items: any },
    ): AppState {
      const { sharedState } = state;

      const targetSharedState = {
        ...sharedState,
      };
      Object.keys(payload.items).forEach((key: string) => {
        targetSharedState[key] = payload.items[key];
      });

      return {
        ...state,
        sharedState: {
          ...targetSharedState
        },
      };
    },      
    setSharedErrorMessage(
      state: AppState,
      payload: { message: string },
    ): AppState {
      const { sharedState } = state;
      return {
        ...state,
        sharedState: {
          ...sharedState,
          errorMessage: payload.message,
        },
      };
    },
    setWizardStep(
      state: AppState,
      payload: { wizardStep: number },
    ): AppState {
      const { sharedState } = state;
      return {
        ...state,
        sharedState: {
          ...sharedState,
          wizardStep: payload.wizardStep,
        },
      };
    },
    nextWizardStep(
      state: AppState,
      payload: {},
    ): AppState {
      const { sharedState } = state;
      return {
        ...state,
        sharedState: {
          ...sharedState,
          wizardStep: sharedState.wizardStep + 1,
        },
      };
    },
    prevWizardStep(
      state: AppState,
      payload: {},
    ): AppState {
      const { sharedState } = state;
      return {
        ...state,
        sharedState: {
          ...sharedState,
          wizardStep: sharedState.wizardStep - 1 >= 0 ? sharedState.wizardStep - 1: 0,
        },
      };
    },        
    setGlobalLoaderEnabled(
      state: AppState,
      payload: {},
    ): AppState {
      const { sharedState } = state;
      return {
        ...state,
        sharedState: {
          ...sharedState,
          globalLoader: true,
        },
      };
    },
    setGlobalLoaderDisabled(
      state: AppState,
      payload: {},
    ): AppState {
      const { sharedState } = state;
      return {
        ...state,
        sharedState: {
          ...sharedState,
          globalLoader: false,
        },
      };
    },
    setLastApplicationEvent(
      state: AppState,
      payload: { type: 'APP_LOADED' | 'VALUE_CHANGED', timespamp: number },
    ): AppState {
      const { sharedState } = state;
      return {
        ...state,
        sharedState: {
          ...sharedState,
          _lastApplicationEvent: {
            type: payload.type,
            timespamp: payload.timespamp
          },
        },
      };
    }, 
    setLastBusinessRulesExecutionTime(
      state: AppState,
      payload: { timespamp: number },
    ): AppState {
      const { sharedState } = state;
      return {
        ...state,
        sharedState: {
          ...sharedState,
          _lastBusinessRulesExecutionTime: payload.timespamp,
        },
      };
    },    
  },
});

export default app;
