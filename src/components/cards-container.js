import React, {Component} from 'react';



export const CardsContainer = (props) => {
  var pages = props.pages;
  return <div id='cards-container'>
  {pages.map((page,key) => {
    return <div className="page-card">
      <div className='wrapper-div'>
      <img src={page.picture.data.url} ></img>
      <div className='details'>
          {page.about.substring(0,200)+'...'}
          <p className="category">Category:{page.category}</p>
      </div>
      </div>
      <div className='footer-div'>
        <img src={page.fav?'./images/favRemove.png':'./images/fav.png'} onClick={(event)=>props.addToFav(event,page)}/>
      </div>
     </div>
  })}
  </div>
}
