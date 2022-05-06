import React from 'react';
import './Editor.css';
import { useState } from 'react';
import { count, countIncr, mergeQuery, revertQuery } from "./incC";
import { callSql } from "../api"
function Editor() {
  var keywords = ["SELECT", "FROM", "WHERE", "LIKE", "BETWEEN", "NOT LIKE", "FALSE", "NULL", "FROM", "TRUE", "NOT IN"];

  let [storedElements, setstoredElements] = useState([<div className="editorf" key={count} id="editor1" contentEditable="true" onInput={(e) => { handleChange(e) }}>
  </div>]);

  function ClearButton(){
    window.location.reload(false);
  }
  
  async function useCallSql() {

    let codeData = document.getElementById(`editor${count}`).textContent;
    
    let finalData = mergeQuery(codeData);
    console.log(finalData)

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
    document.getElementById(`editor${count}`).focus();
    if (res.includes("Error: near line") || res.includes("SELECT")){
      revertQuery();
    }
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
        {storedElements}
      </div>
      <div className="button" onClick={(e) => { ExecuteButton(e) }}>Execute</div>
      <div className="button" onClick={ClearButton}>Clear Screen</div>
    </div>
  );
}
export default Editor;