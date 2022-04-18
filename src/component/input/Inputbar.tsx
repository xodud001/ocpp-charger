import React, { useState, useEffect } from "react";

import styles from "./Inputbar.module.css";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { 
    selectUrl, setUrl,
    selectIdTag, setIdTag
} from '../../feature/client/clientSlice'
import { ActionCreatorWithPayload } from "@reduxjs/toolkit/dist/createAction";
function Inputbar(){

    const url: string = useAppSelector(selectUrl);
    const idTag: string = useAppSelector(selectIdTag)
    const dispatch = useAppDispatch();

    function handleInput(e: any, callback: ActionCreatorWithPayload<string, string>){
        dispatch(callback(e.target.value));
    }

    return(
        <div className={`${styles.Inputbar} d-flex flex-column align-items-stretch flex-shrink-0 bg-white scrollarea`} >
            {/* Endpoint URL */}
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Server URL</InputGroup.Text>
                <FormControl 
                    aria-label="Small" 
                    aria-describedby="inputGroup-sizing-sm" 
                    placeholder="scheme://<host>:<port>/<path>/<charger-id>"
                    onChange={(e) => handleInput(e, setUrl)}
                    value={url}
                    />
            </InputGroup>

            {/* IdTag */}
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">IdTag</InputGroup.Text>
                <FormControl 
                    aria-label="Small" 
                    aria-describedby="inputGroup-sizing-sm" 
                    placeholder="인증에 사용될 IdTag"
                    onChange={(e) => handleInput(e, setIdTag)}
                    value={idTag}
                    />
            </InputGroup>


        </div>
    )
}

export default Inputbar;
