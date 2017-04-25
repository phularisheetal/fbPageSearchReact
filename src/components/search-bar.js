import React, {Component} from 'react';



export const SearchBar = (props) => {
  return <div className="search-bar">
    <input type="text" placeholder="Search Facebook Pages"  onKeyPress={(event)=>props.searchPages(event)}/>
    <a onClick={(event)=>props.showFavPages(event)}>Click to See Favourite Pages</a>
   </div>
}
