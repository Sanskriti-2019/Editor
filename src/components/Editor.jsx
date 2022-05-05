import React from 'react';
import './Editor.css';
import { useState } from 'react';

function Editor() {
  let [storedElements,setstoredElements] = useState("");
function renderSingleDiv() { // generate single element
    return (
      React.createElement(
      "div",
      {className: "crud-card"},
      "NewDiv",
    )
  )
}

function renderCrudDiv(){ // update state with new element
  this.setState((prev) => {
     return { 
         storedElements: [
             ...prev.storedElements, 
            this.renderSingleDiv()
         ]
       }
  });
}
    var keywords = ["SELECT","FROM","WHERE","LIKE","BETWEEN","NOT LIKE","FALSE","NULL","FROM","TRUE","NOT IN"];
    var [newHTML, setNewHTML] = useState("");
    var count = 0;
  function ExecuteButton(){
    document.getElementById("parenteditor").innerHTML+=`<p>this is an output</p>`
    count+=1;
    document.getElementById("parenteditor").innerHTML+=`<p>this is an output</p>`
  }
  function setVal(){
    setVal=" ";
  }
  async function handleChange(e){
    // setOldHTML(e.currentTarget.textContent);
    console.log(e)
    if (e.nativeEvent.data===' ' || e.nativeEvent.data===null || e.nativeEvent.data===';'){
      
      changeColor(e)
    }
    
  }
  async function changeColor(e){
    
    
    var tempText="";
    e.currentTarget.textContent.replace(/[\s]+/g, " ").trim().split(" ").forEach(function(val){
        if (keywords.indexOf(val.trim().toUpperCase()) > -1)
          tempText += "<span class='statement'>" + val.trim().toUpperCase() + "&nbsp;</span>";
        else
          tempText += "<span class='other'>" + val + "&nbsp;</span>"; 
      });

      await setNewHTML(tempText)
      
  
      var child = document.getElementById("editor").children;
      console.log(child[child.length-1])
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(child[child.length-1], 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      document.getElementById("editor").focus();
      
  }
  return (
    <div>
    <div className="enter">Enter statements:</div>
    <div className='parentcontainer' id="parenteditor">
      <div className="container" id="editor" contentEditable="true"  onInput={(e) => { handleChange(e) }} dangerouslySetInnerHTML={{ __html: newHTML }} >
      </div> 
      {storedElements}
    </div>
    <div className="button" onClick={()=>{ExecuteButton()}}>Execute</div>
    <div className="button" onClick={() => {setVal(() => "")}}>Clear Screen</div>
    </div>
  );
}
export default Editor;