import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//services
import {AreaService} from '../../services/area-service';

import {UserPage} from '../user/user';
import {CreateAreaPage} from '../create-area/create-area';

@Component({
  selector: 'page-areas',
  templateUrl: 'areas.html'
})
export class AreasPage {
	public areas: any;
	public url: any;
	public user: any;
  createArea = CreateAreaPage;

  constructor(public nav: NavController, public navParams: NavParams,public http: Http, public areaService: AreaService) {

  	areaService.getAll() //obtener las areas
      .then( areas => {
          this.areas = areas;
    });

  }

  viewUser(userId) {
    //this.nav.push(UserPage, {user: this.user})
    this.url = 'http://talk-social.herokuapp.com/api/usuarios/' + userId;
    this.http.get(this.url ).map(res => res.json()).subscribe(data => {
        console.log(data);
        this.user = data;
        //envia el json del usuario
        this.nav.push(UserPage, {user: this.user})
    }); 
  }//end viewUser


  toggleVote(area) {

    if(area.liked) {
      area.votes--;
    } 
    else {
      area.votes++;

      if(area.votes < 99)
      {
        this.url = 'http://talk-social.herokuapp.com/api/votes.json';
        console.log("11111111");
        this.http.post(this.url, {area_id: area.id , user_id: window.localStorage['current_user_id']})
          .subscribe(data => {
           console.log(data);
          }, error => {
              console.log("Oooops!");
        });
      }

      else
      {
        this.url = 'http://talk-social.herokuapp.com/api/update.json';
        console.log("2222222");
        this.http.post(this.url, {id: area.id , user_id: window.localStorage['current_user_id']})
          .subscribe(data => {
           console.log(data);
          }, error => {
              console.log("Oooops!");
        });

      }

      

  
    }

    area.liked = !area.liked;
  }//end toggleVote

  alreadyVote(area)
  {
    var i;
    for(i in area.votesArray)
    {
      if(area.votesArray[i].user_id == window.localStorage['current_user_id'])
      {
      	console.log("true");
      	console.log(area.votesArray[i].id);
        return true;
      }

    }
    console.log("false");
    return false;
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AreasPage');
  } //end ionViewDidLoad

}
