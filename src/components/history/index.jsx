import React from 'react';
import react, { useReducer,useEffect } from 'react';


const initialState = {
    previousApiCalls: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_PREVIOUS_API_CALLS':
            return { ...state, previousApiCalls: action.payload };
        default:
            throw new Error();
    }
}

function History(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleHistoryClick = (previousApiCall) => {
        props.prevApiCalls(previousApiCall);
    }

    useEffect(() => {
        dispatch({ type: 'UPDATE_PREVIOUS_API_CALLS', payload: props.prevApiCalls });
    }, [props.prevApiCalls]);

    return (
        <>
            <h2>History</h2>
            <ul>
                {state.previousApiCalls.map((previousApiCall, idx) => {
                    return <li key={idx} onClick={() => handleHistoryClick(previousApiCall)}>{previousApiCall.method} {previousApiCall.url}</li>
                })}
            </ul>
        </>
    )
}

export default History;