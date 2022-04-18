import React, { useState, useEffect } from "react";

import styles from "./Sidebar.module.css";

import Button from 'react-bootstrap/Button'


import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { connect, disconnect, send } from '../../feature/client/clientSlice'
import { authorizeMessage, bootNotificationMessage } from "../../feature/client/messages";

function Sidebar(){

    const isConnected: boolean = useAppSelector(state => state.client.isConnected);
    const idTag: string = useAppSelector(state => state.client.idTag);

    const dispatch = useAppDispatch()

    function connectToServer(){
        dispatch(connect())
    }
    function disconnectFromServer(){
        dispatch(disconnect())
    }


    return(
        <div className={`${styles.Sidebar} d-flex flex-column flex-shrink-0 p-3 text-white bg-light`} >
            <a href="/" className={`${styles.Title} d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none`}>
                <span className={styles.Sub}>OCPP 1.6</span>
                <span className={styles.Main}>OCPP 충전기 시뮬레이터</span>
            </a>
            <hr/>
            <div>
                <Button 
                    id="connect"  
                    variant="primary"
                    disabled={isConnected}
                    onClick={ connectToServer }>
                        Connect</Button>
                <Button 
                    id="disconnect" 
                    disabled={!isConnected}
                    variant="primary"
                    onClick={ disconnectFromServer }>
                        Disconnect</Button>
                <p> Now Connection Status : <span id="conn-status">{isConnected ? 'Open' : 'Close'}</span> </p>
            </div>
            <div className={`${styles.MessageButtons} list-group list-group-flush border-bottom scrollarea`}>
                <Button id="authorize" 
                    disabled={!isConnected}
                    onClick={ () => send(authorizeMessage(idTag)) }
                    variant="primary">
                        Authorize
                </Button>
                <Button id="boot-notification" 
                    disabled={!isConnected}
                    onClick={ () => send(bootNotificationMessage()) }
                    variant="primary">
                        Boot Notification
                </Button>
                <Button id="start-transaction" 
                    disabled={!isConnected}
                    variant="primary">
                        Start Transaction
                </Button>
                <Button id="stop-transaction" 
                    disabled={!isConnected}
                    variant="primary">
                        Stop Transaction
                </Button>
                <Button id="data-transfer" 
                    disabled={!isConnected}
                    variant="primary">
                        Data Transfer
                </Button>
                <Button id="heart-beat" 
                    disabled={!isConnected}
                    variant="primary">
                        Heart Beat
                </Button>
                <Button id="meter-values" 
                    disabled={!isConnected}
                    variant="primary">
                        Meter Values
                </Button>
                <Button id="status-notification" 
                    disabled={!isConnected}
                    variant="primary">
                        Status Notification
                </Button>
            </div>
        </div>
    )
}

export default Sidebar;