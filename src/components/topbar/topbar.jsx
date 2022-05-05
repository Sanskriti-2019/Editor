import React from 'react';
import "./topbar.css"

export default function topbar(){
    return(
        <div className ="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">            
                    <span className="logo">SQL Editor</span>
                </div>
            </div>
        </div>
    )
}