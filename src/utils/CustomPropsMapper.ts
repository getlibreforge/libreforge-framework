
const CUSTOM_PROPS_TO_REMOVE = [
  'designMode', 'pageComponents', 'wrapperComponent', 'wrapperContainer', 
  'overridenComponentPageState', 'designModeInteractivityDisabled', 'collectionRefIdx'
]

export const cleanupCustomComponentProps = (props: any): any => {
  if (!props) {
    return {}
  }

  const result = {};
  const keys = Object.keys(props);
  for (let i=0; i < keys.length; i++) {
    const key = keys[i];

    if (key === 'componentId') {
      // @ts-ignore
      result['key'] = props[key];

    } else if (CUSTOM_PROPS_TO_REMOVE.filter(item => item === key).length > 0) {
      // console.debug(`${key} ${props[key]} removed from DOM element`)

    } else {
      // @ts-ignore
      result[key] = props[key];
    }
  }

  return result;
}
