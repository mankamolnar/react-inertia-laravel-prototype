import React, { useState } from 'react';
import { useForm } from "@inertiajs/inertia-react";

const Test = (props) => {

    const { data, setData, errors, post } = useForm({
      rows: [
        { testColumn: "" }
      ]
    });

    function lineChange(e, index) {
      const newData = {...data};
      newData.rows[index].testColumn = e.target.value;
      setData(newData);
    }

    function deleteRow(index) {
      const newData = {...data};
      newData.rows = newData.rows.filter((element, findex) => findex !== index);
      setData(newData);
    }

    function newRow() {
      const newData = {...data};
      newData.rows.push({ testColumn: "" });
      setData(newData);
    }

    function sendData(e) {
      e.preventDefault();
      post("/batch-insert");
    }

    return (
        <div>
          {
            data.rows.map((element, index) => (
              <div key={"row" + index}>
                <input type="text" value={data.rows[index].testColumn} onChange={(e) => lineChange(e, index)} />
                <button onClick={() => deleteRow(index)}>Delete</button> 
              </div>
            ))
          }

          <p>
            <button onClick={newRow}>Új sor</button>
          </p>

          <p>
            <button onClick={sendData}>Save</button>
          </p>

        </div>
    )
}

export default Test