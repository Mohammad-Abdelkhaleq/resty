


import React, { useState,useReducer } from 'react';
import './form.scss';
import { Link } from 'react-router-dom';


const initialState = {
  method: 'GET',
  
}

function reducer(state, action) {
  switch (action.type) {
    case 'GET':
      return { method: 'GET' };
    case 'POST':
      return { method: 'POST' };
    case 'PUT':
      return { method: 'PUT' };
    case 'DELETE':
      return { method: 'DELETE' };
    default:
      throw new Error();
  }
}


function Form(props) {
  // const [newmethod, setMethod] = useState('GET');
  const [newmethod, dispatch] = useReducer(reducer, initialState);
  const [show , setShow] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (newmethod.method === 'GET'|| newmethod.method === 'DELETE') {
      const formData = {
        method: newmethod.method,
        url: e.target.url.value,
      };
      // console.log('Form Data:', formData);
      props.handleApiCall(formData);
      return;
    }
    const formData = {
      method: newmethod.method,
      url: e.target.url.value,
      body: e.target.body.value,
    };
    // console.log('Form Data:', formData);
    props.handleApiCall(formData);
  }

  function handleMethodClick(method) {
    // setMethod(method);
    dispatch({ type: method });
    const formElement = document.getElementById('formy');
    const input = document.getElementById('iamTheOnlyOne');
    if (!input) {
    
    if (method === 'POST'|| method === 'PUT') {
  
      const input = document.createElement('textarea');
      input.setAttribute('type', 'text');
      input.setAttribute('name', 'body');
      input.setAttribute('placeholder', 'Raw JSON Body');
      input.setAttribute('id', 'iamTheOnlyOne');
      formElement.appendChild(input);
      }
  }
  if (input && (method === 'GET'|| method === 'DELETE')) {
    // input.remove();
    formElement.removeChild(input);
  }
  // setElements(prevElements => prevElement.filter(el => el !== input));
}

  return (
    <>
      <form onSubmit={handleSubmit} id="formy">
        <label>
          <span>URL: </span>
          <input name="url" type="text" />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <span id="get" onClick={() => handleMethodClick('GET')}>GET</span>
          <span id="post" onClick={() => handleMethodClick('POST')}>POST</span>
          <span id="put" onClick={() => handleMethodClick('PUT')}>PUT</span>
          <span id="delete" onClick={() => handleMethodClick('DELETE')}>DELETE</span>
          {!show&&<Link to="/history"  onClick={()=>setShow(!show)} >History?</Link>}
          {console.log(show)}
          {show&&<Link to="/" onClick={()=>setShow(!show)} >back</Link>}


        </label>
      </form>
    </>
  );
}

export default Form;











// class Form extends React.Component {

//   handleSubmit = e => {
//     e.preventDefault();
//     const formData = {
//       method:'GET',
//       url: 'https://pokeapi.co/api/v2/pokemon',
//     };
//     this.props.handleApiCall(formData);
//   }

//   render() {
//     return (
//       <>
//         <form onSubmit={this.handleSubmit}>
//           <label >
//             <span>URL: </span>
//             <input name='url' type='text' />
//             <button type="submit">GO!</button>
//           </label>
//           <label className="methods">
//             <span id="get">GET</span>
//             <span id="post">POST</span>
//             <span id="put">PUT</span>
//             <span id="delete">DELETE</span>
//           </label>
//         </form>
//       </>
//     );
//   }
// }

// export default Form;

// use function components instead of class components  