import { Container } from 'inversify';
import {
  ComponentProvider,
  SYMBOL_COMPONENT_PROVIDER,
} from './ComponentProvider';
import { ButtonProvider } from './components/Button/ButtonProvider';
import { CloseButtonProvider } from './components/CloseButton/CloseButtonProvider';
import { ContainerProvider } from './components/Container/ContainerProvider';
import { CenterProvider } from './components/Center/CenterProvider';
import { GridProvider } from './components/Grid/GridProvider';
import { LinkProvider } from './components/Link/LinkProvider';
import { LoaderProvider } from './components/Loader';
import { CheckboxProvider } from './components/Checkbox/CheckboxProvider';
import { TextareaProvider } from './components/Textarea/TextareaProvider';
import { InputProvider } from './components/Input/InputProvider';
import { RadioProvider } from './components/Radio/RadioProvider';
import { DividerProvider } from './components/Divider/DividerProvider';
import { SelectProvider } from './components/Select/SelectProvider';
import { LoginFormProvider } from './composite/LoginForm/LoginFormProvider';
import { DataProvider, SYMBOL_DATA_PROVIDER } from './providers/DataProvider';
import { SampleDictionaryDataProvider } from './providers/SampleDictionaryDataProvider';
import { AbstractAction, SYMBOL_ACTION_PROVIDER } from './actions/AbstractAction';
import { SYMBOL_VALUE_CHANGE_ACTION, AbstractValueChangeAction } from './actions/AbstractValueChangeAction';
import { DefaultValueChangeAction } from './actions/DefaultValueChangeAction';
import { ImageProvider, WizardStepProvider, WizardStepperProvider } from './components';
import { FormProvider } from './components/Form';
import { ClickByRefAction, DebugStateAction, ExecuteScriptAction, ExtractLocationDataAction, ExtractResponseDataAction, ExtractResponseDataToSharedAction, FetchAction, RouteToNextWizardStepAction, RouteToPageRedirectAwareAction, RouteToPrevWizardStepAction } from './actions';
import { FormControlProvider } from './components/FormControl';
import { FormLabelProvider } from './components/FormLabel';
import { FormErrorMessageProvider } from './components/FormErrorMessage';
import { StackProvider } from './components/Stack';
import { HeadingProvider } from './components/Heading';
import { FormSubmitButtonProvider } from './components/FormSubmitButton';
import { FormSubmitAction } from './actions/FormSubmitAction';
import { AbstractI18nLookupService, DefaultI18nLookupService, SYMBOL_I18N_PROVIDER } from './services';
import { FormBusinessRuleMessageProvider } from './components/FormBusinessRuleMessage';
import { ComponentPaginationProvider, ComponentRefProvider } from './components/Tools';
import { PasswordInputProvider } from './components/PasswordInput';
import { LocalDateProvider } from './components/LocalDate';
import { VariableTextProvider, TextProvider } from './components/Label';
import { ComponentForEachProvider } from './components/Tools/ComponentForEach';
import { OnPageLoadActionProvider, ResourceLoadPageActionProvider } from './components/Tools/PageActions';
import { AuthorizationManager, SYMBOL_AUTHORIZATION_MANAGER } from './security/AuthorizationManager';
import { RouteToPageAction } from './actions/RouteToPageAction';
import { AbstractValidationRule, SYMBOL_VALIDATION_RULE } from './validation/AbstractValidationRule';
import { RequiredValidationRule } from './validation/RequiredValidationRule';
import { LengthBetweenValidationRule } from './validation/LengthBetweenValidationRule';


export function bindProviders(
    container: Container,
    
    /* Mechanism to override specific services */
    i18nLookupServiceType: new (...args: never[]) => AbstractI18nLookupService = DefaultI18nLookupService,
    routeToPageAction: new (...args: never[]) => AbstractAction = RouteToPageAction,
    routeToPageRedirectAwareAction: new (...args: never[]) => AbstractAction = RouteToPageRedirectAwareAction,
    routeToNextWizardStepAction: new (...args: never[]) => AbstractAction = RouteToNextWizardStepAction,
    routeToPrevWizardStepAction: new (...args: never[]) => AbstractAction = RouteToPrevWizardStepAction,
  ) {

  /* Standard Components */
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(GridProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(ContainerProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(StackProvider);

  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(ButtonProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(CloseButtonProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(CenterProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(ImageProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(TextProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(VariableTextProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(LinkProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(LoaderProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(CheckboxProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(TextareaProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(HeadingProvider);  
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(InputProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(PasswordInputProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(RadioProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(DividerProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(SelectProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(LocalDateProvider);

  /* Tools */
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(ComponentRefProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(ComponentForEachProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(ComponentPaginationProvider);

  /* Page Actions */
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(ResourceLoadPageActionProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(OnPageLoadActionProvider);

  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(FormProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(FormControlProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(FormLabelProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(FormErrorMessageProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(FormBusinessRuleMessageProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(FormSubmitButtonProvider);

  /* Wizard */
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(WizardStepperProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(WizardStepProvider);

  /* Composite Components */
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(LoginFormProvider);

  /* Data Providers */
  container.bind<DataProvider>(SYMBOL_DATA_PROVIDER).to(SampleDictionaryDataProvider);

  /* Services */
  container.bind<AbstractI18nLookupService>(SYMBOL_I18N_PROVIDER).to(i18nLookupServiceType);

  /* Handlers */
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(DebugStateAction);
  container.bind<AbstractValueChangeAction>(SYMBOL_VALUE_CHANGE_ACTION).to(DefaultValueChangeAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(FetchAction);

  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(FormSubmitAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(ExtractResponseDataAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(ExtractResponseDataToSharedAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(ExtractLocationDataAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(ExecuteScriptAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(ClickByRefAction);

  /* Actions to move between the pages */
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(routeToPageAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(routeToPageRedirectAwareAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(routeToNextWizardStepAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(routeToPrevWizardStepAction);

  /* Validation Rules */
  container.bind<AbstractValidationRule>(SYMBOL_VALIDATION_RULE).to(RequiredValidationRule);
  container.bind<AbstractValidationRule>(SYMBOL_VALIDATION_RULE).to(LengthBetweenValidationRule);

  bindSecurityProviders(container);
}

function bindSecurityProviders(container: Container) {

  /* Security */
  container.bind<AuthorizationManager>(SYMBOL_AUTHORIZATION_MANAGER).to(AuthorizationManager);

  // const isRefreshStrategyBound = container.isBound(SYMBOL_REFRESH_STRATEGY);
  // if (true !== isRefreshStrategyBound) {
  //   container.bind<AbstractSessionRefreshStrategy>(SYMBOL_REFRESH_STRATEGY).to(OAuth2SessionRefreshStrategy);
  // }    
}
