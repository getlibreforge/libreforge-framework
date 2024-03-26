import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getAppState } from "../core";
import { AbstractCallbackHandler } from "./AbstractCallbackHandler";
import { useDispatch } from "../hooks";
import { useSnackbar } from "../hooks/useSnackbar";

type CallbackHandlerPageProps = {
  designMode: boolean;
  handler: AbstractCallbackHandler
}

const CallbackHandlerPage: React.FC<CallbackHandlerPageProps> = ({ designMode, handler }) => {

  const counter = useState(0);

  const dispatch = useDispatch();
  const appState = useSelector(getAppState);
  const router = useNavigate();
  const snackbar = useSnackbar();

  useEffect(() => {    
    handler.execute(appState, dispatch, snackbar, router);
  }, [counter]);

  return <></>
};

export default CallbackHandlerPage;
