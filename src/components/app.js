import React, { Component } from 'react';
import {SearchBar} from './search-bar';
import {CardsContainer} from './cards-container';
import {request} from '../Request';
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      pointer:true,
      searchWord:'',
      pages:[],
      favPages:[]
    }
    this.searchPages = this.searchPages.bind(this);
    this.showFavPages=this.showFavPages.bind(this);
    this.addToFav = this.addToFav.bind(this)
  }


  componentWillMount() {
    if(localStorage.getItem('fav') == undefined) {
      localStorage.setItem('fav','')
    }
  }

  showFavPages(event) {
    let val = this.state.pointer?'Click to see All pages':'Click to See Favourite Pages';
    event.target.innerHTML = val;
    this.setState(prevState => ({
      pointer: !prevState.pointer
    }));
    this.forceUpdate();
  }

  searchPages(event){
    let access_token = "412549179114933|EAppUimRo2Fw2vgwAfpPdkYL_p4";
    let pages=[];

    if(event.key == 'Enter') {
      request({url:'https://graph.facebook.com/v2.9/search?q='+event.target.value+'&type=page&access_token='+access_token}).then((data) => {
        data.data.forEach(function(obj,key) {
         if(key < 4){
            request({url:'https://graph.facebook.com/v2.9/'+obj.id+'?fields=id%2Cabout%2Ccategory%2Cpicture%2Ccompany_overview&access_token='+access_token}).then((page) => {
              pages.push(page)
              this.setState({pages});

          })
          }
       }.bind(this))

     })

    }
  }

  addToFav(eve,page) {
      let tempArr = this.state.favPages.slice(0);
      let allPagesArr = this.state.pages.slice(0);
      page.fav = !page.fav;
      if(page.fav){
          tempArr.push(page)
        }else {
          tempArr = tempArr.filter((currpage)=>{
              return page.id != currpage.id
          });
          allPagesArr = allPagesArr.map((pg)=>{
              if(pg.id == page.id) {
                pg.fav = false;
                return pg;
              }
              return pg;
          })

        }
      this.setState({favPages: tempArr})
      localStorage.setItem('fav',JSON.stringify(tempArr))
  }

  render() {
    return (
      <div>
      <SearchBar searchPages={this.searchPages} showFavPages={this.showFavPages}/>
      {this.state.pointer?<CardsContainer pages={this.state.pages} addToFav={this.addToFav} />
        :<CardsContainer pages={JSON.parse(localStorage.getItem('fav'))} addToFav={this.addToFav}/>}
      </div>
    );
  }
}
