import React, { useState } from 'react';
import './form.scss';

function Form(props) {
  const [newmethod, setMethod] = useState('GET');

  function handleSubmit(e) {
    e.preventDefault();

    if (newmethod === 'GET'|| newmethod === 'DELETE') {
      const formData = {
        method: newmethod,
        url: e.target.url.value,
      };
      console.log('Form Data:', formData);
      props.handleApiCall(formData);
      return;
    }
    const formData = {
      method: newmethod,
      url: e.target.url.value,
      body: e.target.body.value,
    };
    console.log('Form Data:', formData);
    props.handleApiCall(formData);
  }

  function handleMethodClick(method) {
    setMethod(method);
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