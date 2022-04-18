import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import clientReducer from '../feature/client/clientSlice'


export const store = configureStore({
    reducer: {
        client: clientReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch