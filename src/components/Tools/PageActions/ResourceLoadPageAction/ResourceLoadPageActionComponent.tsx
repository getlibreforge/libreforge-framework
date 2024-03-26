import { ReactElement, forwardRef, memo } from 'react';
import { Box } from '@chakra-ui/react';
import { MdCloudDownload } from "react-icons/md";
import FormSubmitService from '../../../../services/FormSubmitService';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import { getAppState } from '../../../../core';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../../../hooks';
import { cleanupCustomComponentProps } from '../../../../utils/CustomPropsMapper';

const ResourceLoadPageActionComponent = forwardRef((props: { componentId: string, 
  designMode: boolean, url: string, variable: string, wrapperComponent?: ReactElement, wrapperContainer?: ReactElement }, ref) => {

    const appState = useSelector(getAppState);
    const dispatch = useDispatch();    
    const snackbar = useSnackbar();

  if (!!props.url && !!props.variable) {

    /* Check resource already loaded */
    if (!!appState.sharedState[props.variable]) {
      /* Do nothing */
      
    } else {
      
      FormSubmitService.load(props.url)
      .then(async (response) => {

        if (!response.ok) {
          // @ts-ignore
          snackbar.error(`Can't load resource ${props.variable}`);
          return;
        }

        const data = await response.json();
        dispatch.app.changeSharedState({ name: props.variable, value: data });

      }).catch(error => {
        // @ts-ignore
        snackbar.error(`Can't load resource ${props.variable}`);
      })
    }
  } else {
    console.warn('ResourceLoadPageActionComponent. Url or Variable not set');
  }
  
  if (true === props.designMode) {
    const cleanedProps = cleanupCustomComponentProps({ ...props, ref });

    return (
      //@ts-ignore
      <Box {...cleanedProps}>
        <MdCloudDownload size="28" />
      </Box>
    );
  } else {
    return <></>;    
  }
});

export default memo(ResourceLoadPageActionComponent);
