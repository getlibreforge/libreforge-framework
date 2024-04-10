# LibreForge Framework

## LibreForge Platform
LibreForge platform is WIX for enterprise - no code integrated development environment to let enterprises and agencies build user facing portals.

![Overall Design](docs/diagrams/context.png "Overall Design")

One of the main pillar of platform is open source LibreForge Framework.  
The open source nature of framework empowers organizations to avoid vendor lock by providing freedom of choice, 
enabling customization and control over the source code, ensuring long-term viability independent of vendor roadmaps,
promoting interoperability, and enhancing security through community-driven transparency and vigilance.

## Framework Abstractions

This section delineates the framework's provided abstractions, essential for implementing a standardized collection of components, actions, etc. 
Furthermore, it defines the guiding principles of design that developers are expected to adhere to when crafting custom implementations.

### AbstractAction 

The framework furnishes a set of preconfigured UI actions, ready to be attached to UI components and triggered by the end-users, such as those triggered by button clicks. 
E.g. the actions triggered by the button click.
For instance, the [FormSubmitAction](https://github.com/getlibreforge/libreforge-framework/blob/main/src/actions/FormSubmitAction.ts) is usually attached to the [FormSubmitButton](https://github.com/getlibreforge/libreforge-framework/tree/main/src/components/FormSubmitButton) component.
Each action possesses unique characteristics, delineating specific conventions that developers must acknowledge and adhere to.

The framework offers flexibility beyond predefined actions, empowering developers to introduce custom actions seamlessly, 
thereby extending functionality accessible to both Designer and End Users Portal.

A prime illustration of this flexibility is evident in `librepackage-security-oauth2-google`, 
which provides Google based login capabilities, one of the enablement is [OAuth2GoogleRedirectAction](https://github.com/getlibreforge/librepackage-security-oauth2-google/blob/main/src/actions/OAuth2GoogleRedirectAction.ts).
This action initiates the OAuth 2.0 Authorization Code flow and is Google specific.

By inspecting the `AbstractAction` class, developers can understand, what is being available to the action at a time of execution.

```
@injectable()
export abstract class AbstractAction {

  abstract execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }>;
```

The `ActionExecutionContext` defines the next objects available during the action execution:

- `componentId` - id of a component, the action is attached to and which has triggered it
- `collectionRefIdx` - if UI component is rendered by iterating the collection (e.g. as it is done by `forEach` component), then index of collection item is propagated to an action execution
- `args` - and object that keeps the value for action arguments, as it was defined during design time. E.g. if that's the `FetchAction`, then that one require `url` argument to be defined during the design time
- `pageComponents` - page definition, i.e. all the components on a page, which is rendered. So that developer can get the component object by the `componentId`
- `currentPageState` - object, which represents the temporary state (it's cleaned during the page switch) the current active page works with. All the components write to / read from this state
- `sharedState` - object representing the state, which is capable to survive the page change. Such state is used to store the `security token` or `loader state`
- `dispatch` - Redux dispatcher to let developer call reducers and change the `currentPageState` or `sharedState` during action execution
- `snackbar` - to let developer show temporary end user notification
- `router` - react router to let the end user be routed to another page
- `container` - `IoC/DI` container to let reach any of the discoverable components / services / etc
- `prevExecutionState` - currently the object, which contains the result of previous action execution. I.e. there may be multiple actions attached to the `Button` and these actions are executed one by one. It is possible to have a scenario, when 2nd action needs to work with result of 1st action execution (e.g. response from server)
- `pagination` - pagination details (page, size), in case the action is executed in pagination context 

As we can see the plenty of capabilities are made available to the `action` - it can interact with user, read / change the state, redirect and literally access any service through the `IoC/DI` context. 

### ComponentProvider
TBD

### AbstractValidationRule
TBD

### AbstractI18nLookupService
TBD

### AbstractCallbackHandler
TBD

### Security

```
AuthorizationManager
AbstractAuthorizationConfigProvider
AbstractSessionRefreshStrategy
```
