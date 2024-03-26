import { useDispatch } from './useDispatch';

export const useCheckboxActions = (props: any) => {

  const { designMode, _x_name } = props
  const dispatch = useDispatch();

  let targetProps = { ...props };

  if (true !== designMode) {
    targetProps = {
      ...props,
      onChange: (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch.app.changeCurrentPageState({ name: _x_name, value: e.target.checked });
      },
    };
  }

  return targetProps;
};
