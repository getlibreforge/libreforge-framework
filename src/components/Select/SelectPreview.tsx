import { forwardRef, useMemo } from 'react';
import { Select } from '@chakra-ui/react';
import { iconsList } from '../../iconsList';
import { useSelector } from 'react-redux';
import { getDictionariesObject } from '../../core/selectors/app';
import { cleanupCustomComponentProps } from '../../utils/CustomPropsMapper';
import { usePageStateValueByComponentRef } from '../../hooks';
import { useSelectActions } from '../../hooks/useSelectActions';

const SelectPreview = forwardRef((props: any, ref) => {

  const { _x_name, _x_dict, _x_dict_filter, icon } = props

  const dictionaries = useSelector(getDictionariesObject);
  const currentValue = usePageStateValueByComponentRef(_x_name)?.value;
  const currentFilterValue = usePageStateValueByComponentRef(_x_dict_filter)?.value;

  let selectOptions: { code: string, value: string, filter1: string }[] = [];
  /* Get dictionary */
  if (!!_x_dict) {
    selectOptions = !!dictionaries && !!dictionaries[_x_dict] ? dictionaries[_x_dict].items: [];
  }
  /* Filter values */
  if (!!_x_dict_filter) {
    selectOptions = selectOptions.filter(item => item.filter1 === currentFilterValue);
  }

  const Icon = useMemo(() => {
    if (!icon) {
      return null;
    }
    return iconsList[icon as keyof typeof iconsList];
  }, [icon]);

  const propsWithCleanup = cleanupCustomComponentProps(props)
  const propsWithAction = useSelectActions(propsWithCleanup);

  return (    
    <Select {...propsWithAction} ref={ref} icon={Icon ? <Icon path="" /> : undefined}>
      <option value="">None</option>
      {selectOptions.map((option) => {
        return <option value={option.code} selected={option.code === currentValue}>{option.value}</option>;
      })}
    </Select>
  );
});

export default SelectPreview;
