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


import React, { useState } from 'react';
import axios from 'axios';

import './app.scss';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import JSONView from 'react-json-view';

function App() {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});

  const callApi =async (requestParams) => {

    setRequestParams(requestParams);

    if(requestParams.method==='GET'){
      const response = await axios.get(requestParams.url);
      setData(response.data);
    }
    if(requestParams.method==='POST'){
      const response = await axios.post(requestParams.url);
      setData(response.data);
    }
    if(requestParams.method==='PUT'){
      const response = await axios.put(requestParams.url);
      setData(response.data);
    }
    if(requestParams.method==='DELETE'){
      const response = await axios.delete(requestParams.url);
      setData(response.data);
    }


    // mock output
    // const newData = {
    //   count: 2,
    //   results: [
    //     { name: 'fake thing 1', url: 'http://fakethings.com/1' },
    //     { name: 'fake thing 2', url: 'http://fakethings.com/2' },
    //   ],
    // };
   
    // setData(newData);
    
  };

  return (
    <>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      {/* <Results  src={jsonData} theme="rjv-default"  data={data}/> */}
      {data&&<JSONView src={data} theme="rjv-default" />}
      <Footer />
    </>
  );
}

export default App;
