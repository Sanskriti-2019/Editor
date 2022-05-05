import React from 'react';
import './Editor.css';
import { useState } from 'react';
import {count, countIncr} from "../../incC"

function Editor() {
    var keywords = ["SELECT","FROM","WHERE","LIKE","BETWEEN","NOT LIKE","FALSE","NULL","FROM","TRUE","NOT IN"];
    let [disable, setDisable] = useState(false);
  
    let [storedElements,setstoredElements] = useState([<div className="editorf" key={count} id="editor1" contentEditable="true"  onInput={(e) => { handleChange(e) }}>
    </div> ]);
  
    
    function ExecuteButton(e){
      console.log(count)
      e.preventDefault()
      document.getElementById(`editor${count}`).contentEditable = "false"
      countIncr()
      setstoredElements([...storedElements,<p className="output">this is an output</p>,<div className="editorf" key={count} id={"editor"+count} contentEditable="true"  onInput={(e) => { handleChange(e) }} >
          </div>]);
    }
    async function handleChange(e){
      if (e.nativeEvent.data===' ' || e.nativeEvent.data===';'){      
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
  
        document.getElementById(`editor${count}`).innerHTML = tempText;
        
        let child = document.getElementById(`editor${count}`).children;
        console.log(child)
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(child[child.length-1], 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        document.getElementById(`editor${count}`).focus();
        
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