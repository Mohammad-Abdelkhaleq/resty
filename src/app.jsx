// import React from 'react';

// import './app.scss';

// // Let's talk about using index.js and some other name in the component folder
// // There's pros and cons for each way of doing this ...
// import Header from './components/header';
// import Footer from './components/footer';
// import Form from './components/form';
// import Results from './components/results';

// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       data: null,
//       requestParams: {},
//     };
//   }

//   callApi = (requestParams) => {
//     // mock output
//     const data = {
//       count: 2,
//       results: [
//         {name: 'fake thing 1', url: 'http://fakethings.com/1'},
//         {name: 'fake thing 2', url: 'http://fakethings.com/2'},
//       ],
//     };
//     this.setState({data, requestParams});//what does this do?this is the same as this.setState({data:data, requestParams:requestParams})
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Header />
//         <div>Request Method: {this.state.requestParams.method}</div>
//         <div>URL: {this.state.requestParams.url}</div>
//         <Form handleApiCall={this.callApi} />
//         <Results data={this.state.data} />
//         <Footer />
//       </React.Fragment>
//     );
//   }
// }

// export default App;


import React, { useState, useReducer } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';



import './app.scss';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import JSONView from 'react-json-view';
import History from './components/history';

const initialState = {
  data: null,
  requestParams: {},
  previousRequestsHistory: [],
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST_PARAMS':
      return { ...state, requestParams: action.payload };
    case 'UPDATE_DATA':
      return { ...state, data: action.payload };

    case 'UPDATE_PREVIOUS_REQUESTS_HISTORY':
      return { ...state, previousRequestsHistory: action.payload };  
    default:
      throw new Error();
  }
}

function addToHistory(props) {



}


function App() {
  // const [data, setData] = useState(null);
  // const [requestParams, setRequestParams] = useState({});

  const [state, dispatch] = useReducer(reducer, initialState);


  const callApi = async (requestParams) => {
    dispatch({ type: 'UPDATE_REQUEST_PARAMS', payload: requestParams });
  };

  const updateHistory = (newApiCall) => {
    state.previousRequestsHistory.push(newApiCall);
    dispatch({ type: 'UPDATE_PREVIOUS_REQUESTS_HISTORY', payload: state.previousRequestsHistory });
  };
  
  useEffect(() => {
    if (state.requestParams.method) {
      const fetchData = async () => {
        try {
          let response;
  
          if (state.requestParams.method === 'GET') {
            response = await axios.get(state.requestParams.url);
          } else if (state.requestParams.method === 'POST') {
            response = await axios.post(state.requestParams.url);
          } else if (state.requestParams.method === 'PUT') {
            response = await axios.put(state.requestParams.url);
          } else if (state.requestParams.method === 'DELETE') {
            response = await axios.delete(state.requestParams.url);
          }
  
          dispatch({ type: 'UPDATE_DATA', payload: response.data });
        } catch (error) {
          // Handle error here
        }
      };
  
      fetchData();
    }

    updateHistory(state.requestParams);


  }, [state.requestParams]);


  useEffect(() => {
  
    callApi(state.requestParams);
    
  }, [state.data]);
  return (
    <>



<Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <Form handleApiCall={callApi} />

      <Routes>
      {state.data&&<Route path="/" element={<JSONView src={state.data} theme="rjv-default" />} />}
      {/* <Results  src={jsonData} theme="rjv-default"  data={data}/> */}
      <Route path="/history" element={<History  prevApiCalls={state.previousRequestsHistory}   />} />
      
      </Routes>

      {/* <Results  src={jsonData} theme="rjv-default"  data={data}/> */}
      {/* {state.data&&<JSONView src={state.data} theme="rjv-default" />} */}
      <Footer />




    </>
  );
}

export default App;
