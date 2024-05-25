import { configureStore } from "@reduxjs/toolkit";
import drawerReducer, { drawerSlice } from "./drawerSlice";
import _ from "lodash";
import { TodoApi } from "../Api/Todo";

const store = configureStore({
    reducer: {
        drawer: drawerReducer,
        [TodoApi.reducerPath]: TodoApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(TodoApi.middleware)
})


const createActions = (slice) =>
    _.mapValues(
        slice.actions,
        (actionCreator) => (payload) =>
            store.dispatch(actionCreator(payload))
    );

export const actions = {
    drawer: createActions(drawerSlice)
}

export default store;