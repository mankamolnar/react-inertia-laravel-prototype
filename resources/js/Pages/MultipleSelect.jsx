import React, { useState } from 'react';
import { useForm } from "@inertiajs/inertia-react";


const Test = (props) => {
    console.log(props);

    const { data, setData, errors, get } = useForm({
      flist1: "",
      flist2: ""
    });


    return (
        <div>
          <select onChange={(e) => setData({...data, flist1: e.target.value})}>
            <option>CHOOSE</option>
            {
              props.flist1.map((element) => (
                <option selected={element.test_column == props.chosenId1} value={element.test_column}>{element.test_column}</option>
              ))
            }
          </select>

          <select onChange={(e) => setData({...data, flist2: e.target.value})}>
            {
              props.flist2.map((element) => (
                <option value={element.id}>{element.test_column_new}</option>
              ))
            }
          </select>

          <button onClick={() => get("/multiple-select")}>Következő</button>

        </div>
    )
}

export default Test