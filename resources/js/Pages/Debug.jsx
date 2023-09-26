import React, { useState } from 'react';

const Test = (props) => {
    console.log(props);

    return (
        <h1>Debug: {props.data}</h1>
    )
}

export default Test