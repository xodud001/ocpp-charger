import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../app/hooks';
import type { RootState } from '../../app/store'


interface ClientStats{
    client: any,
    url: string,
    isConnected: boolean,
    idTag: string;
}

const initialState: ClientStats = {
    client: null,
    url: 'ws://localhost:8080/ocpp/1001',
    isConnected: false,
    idTag: "1010010187749239"
}

function onMessage(event: any) {
    console.log(event.data)
}

function open(){
    console.log("connected!")
    const { setConnected } = clientSlice.actions;
    const dispatch = useAppDispatch()
    dispatch(setConnected(true));
}

function close(){
    console.log("disconnected!")
    const { setConnected } = clientSlice.actions;
    const dispatch = useAppDispatch()
    dispatch(setConnected(false));
}

export const clientSlice = createSlice({
    name: 'charger',
    initialState,
    reducers: {
        connect: (state) => {
            state.client = new WebSocket(state.url);
            console.log(state.isConnected)
            state.client.onopen = open
            state.client.close = close
            state.client.onmessage = onMessage
        },
        disconnect: (state) =>{
            state.client?.close();
        },
        send: (state, action: PayloadAction<string>) =>{
            state.client?.send(action.payload);
            
        },
        setConnected: (state, action: PayloadAction<boolean>) =>{
            state.isConnected = action.payload;
        },
        setUrl: (state, action: PayloadAction<string>) =>{
            state.url = action.payload
        },
        setIdTag: (state, action: PayloadAction<string>) =>{
            state.idTag = action.payload
        }
    }
})

export const { connect, disconnect, setUrl, setIdTag, send, setConnected } = clientSlice.actions

export const selectClient = (state: RootState) => state.client.client
export const selectUrl = (state: RootState) => state.client.url
export const isConnected = (state: RootState) => state.client.isConnected
export const selectIdTag = (state: RootState) => state.client.idTag

export default clientSlice.reducer