import { useDispatch } from './useDispatch';
import { format } from 'date-fns';

export const useDateActions = (props: any) => {

  const { designMode, _x_name } = props
  const dispatch = useDispatch();

  let targetProps = { ...props };

  if (true !== designMode) {
    targetProps = {
      ...props,
      onChange: (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (!!e.target.value) {
          dispatch.app.changeCurrentPageState({ name: _x_name, value: format(new Date(e.target.value), 'yyyy-MM-dd') });
        } else {
          dispatch.app.changeCurrentPageState({ name: _x_name, value: undefined });
        }
      },
    };
  }

  return targetProps;
};
