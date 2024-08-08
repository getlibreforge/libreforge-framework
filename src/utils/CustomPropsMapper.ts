
const CUSTOM_PROPS_TO_REMOVE = [
  'designMode', 'pageComponents', 'wrapperComponent', 'wrapperContainer', 
  'overridenComponentPageState', 'designModeInteractivityDisabled', 'collectionRefIdx', 
  'pages', '_x_name', '_x_onchange', 'children', 'componentId'
]

export const cleanupCustomComponentProps = (props: any, extraProps: {} = {}): any => {
  if (!props) {
    return {}
  }

  const propsToRemove = [...CUSTOM_PROPS_TO_REMOVE, ...Object.keys(extraProps)];

  const result = {};
  const keys = Object.keys(props);
  for (let i=0; i < keys.length; i++) {
    const key = keys[i];

    // @ts-ignore
    if (key === 'componentId' && !extraProps['key']) {
      // @ts-ignore
      result['key'] = props[key];

    } else if (propsToRemove.filter(item => item === key).length > 0) {
      // console.debug(`${key} ${props[key]} removed from DOM element`)

    } else {
      // @ts-ignore
      result[key] = props[key];
    }
  }

  return result;
}
