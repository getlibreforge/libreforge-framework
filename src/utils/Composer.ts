import { generateId, IComponents, ComponentType } from "@libreforge/libreforge-framework-shared"

export type ComposedComponent = {
  components: IComponents;
  root: string;
  parent: string;
};

type AddNode = {
  type: ComponentType;
  parent?: string;
  props?: any;
  rootParentType?: ComponentType;
};

class Composer {
  components: IComponents = {};

  rootComponentType: ComponentType | undefined = undefined;

  constructor(name?: ComponentType) {
    if (name) {
      this.rootComponentType = name;
    }
  }

  addNode = ({
    type,
    parent = 'root',
    props = {},
    rootParentType,
  }: AddNode): string => {
    const id = generateId();

    if (parent === 'root' && !this.rootComponentType) {
      this.rootComponentType = type;
    }
    const localRootParentType = rootParentType || this.rootComponentType;

    // const { form, ...defaultProps } = DEFAULT_PROPS[type] || {};
    const { ...defaultProps } = {};

    this.components = {
      ...this.components,
      [id]: {
        children: [],
        type,
        parent,
        id,
        props: { ...defaultProps, ...props, _x_name: id },
        rootParentType: localRootParentType,
      },
    };

    if (parent !== 'root' && this.components[parent]) {
      this.components[parent].children.push(id);
    }

    return id;
  };

  getComponents() {
    return this.components;
  }
}

export default Composer;
