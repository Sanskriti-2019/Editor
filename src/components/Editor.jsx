import React from 'react';
import './Editor.css';
import { useState } from 'react';
import { count, countIncr } from "./incC";
import { callSql } from "../api"

function Editor() {
  var keywords = ["SELECT", "FROM", "WHERE", "LIKE", "BETWEEN", "NOT LIKE", "FALSE", "NULL", "FROM", "TRUE", "NOT IN"];
  let [disable, setDisable] = useState(false);

  let [storedElements, setstoredElements] = useState([<div className="editorf" key={count} id="editor1" contentEditable="true" onInput={(e) => { handleChange(e) }}>
  </div>]);
  async function useCallSql() {

    let codeData = document.getElementById(`editor${count}`).textContent;
    let initialData = `BEGIN TRANSACTION;

    /* Create a table called NAMES */
    CREATE TABLE NAMES(Id integer PRIMARY KEY, Name text);
    
    /* Create few records in this table */
    INSERT INTO NAMES VALUES(1,'Tom');
    INSERT INTO NAMES VALUES(2,'Lucy');
    INSERT INTO NAMES VALUES(3,'Frank');
    INSERT INTO NAMES VALUES(4,'Jane');
    INSERT INTO NAMES VALUES(5,'Robert');
    COMMIT;
    `
    var re = new RegExp(String.fromCharCode(160), "g");
    let finalData = initialData+(codeData.replace(re, " "))
    console.log(finalData)
    let formData = new FormData();    //formdata object

    let aData = {
      
        clientId: "cd519ae31321ff63daa65af96fa25dc6",
        clientSecret: "336eabb5e252d15ac8c9d2b7972db6663c7275cedd00cd80afd76ec09de7ba1",
        script: finalData,
        language: "sql",
        versionIndex: "4"
    
    }

   
    let res = await callSql(aData)
    return res.data.output;
  }
  
  async function ExecuteButton(e) {
    let res = await useCallSql()

    console.log(res)
    e.preventDefault()
    document.getElementById(`editor${count}`).contentEditable = "false"
    countIncr()
    await setstoredElements([...storedElements, <p className="output" style={{whiteSpace: "pre-wrap"}}>{res}</p>, <div className="editorf" key={count} id={"editor" + count} contentEditable="true" onInput={(e) => { handleChange(e) }} >
      <br />
    </div>]);

    let child = document.getElementById(`editor${count}`).children;
    console.log(child)
    var range = document.createRange();
    var sel = window.getSelection();
    // we'll do that in a
    // range.setStart(child[child.length - 1], 1);
    // range.collapse(true);
    // sel.removeAllRanges();
    // sel.addRange(range);

    // now the front end part is ready....just need to integrate the apis.
    // youvraj has found
    document.getElementById(`editor${count}`).focus();
  }
  async function handleChange(e) {
    if (e.nativeEvent.data === ' ' || e.nativeEvent.data === ';') {
      changeColor(e)
    }

  }
  async function changeColor(e) {
    var tempText = "";
    e.currentTarget.textContent.replace(/[\s]+/g, " ").trim().split(" ").forEach(function (val) {
      if (keywords.indexOf(val.trim().toUpperCase()) > -1)
        tempText += "<span class='statement'>" + val.trim().toUpperCase() + "&nbsp;</span>";
      else
        tempText += "<span class='other'>" + val + "&nbsp;</span>";
    });

    document.getElementById(`editor${count}`).innerHTML = tempText;

    let child = document.getElementById(`editor${count}`).children;
    console.log(child)
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(child[child.length - 1], 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    document.getElementById(`editor${count}`).focus();

  }
  return (
    <div>
      <div className="enter">Enter statements:</div>
      <div className='parentcontainer' id="parenteditor">
        {/* <div className="container" id="editor" contentEditable="true"  onInput={(e) => { handleChange(e) }} dangerouslySetInnerHTML={{ __html: newHTML }} > */}
        {/* </div>  */}
        {storedElements}
      </div>
      {/* oh it was your whatsapp.... i thought mine ws pinging */}
      <div className="button" onClick={(e) => { ExecuteButton(e) }}>Execute</div>
      <div className="button" onClick={() => { setstoredElements(() => "") }}>Clear Screen</div>
    </div>
  );
}
export default Editor;