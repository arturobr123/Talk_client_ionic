import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {UserPage} from '../user/user';

/**
 * Generated class for the MyFriendsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-my-friends',
  templateUrl: 'my-friends.html',
})
export class MyFriendsPage {

  public friends : any;
  public url: any;
  public user : any;
  public userID : any;

  constructor(public nav: NavController, public navParams: NavParams, public http: Http) {

    this.userID = navParams.get('userID');

  	this.url = "http://talk-social.herokuapp.com/api/myFriends?user_id=" + this.userID + ".json";
        this.http.get(this.url).map(res => res.json())
        .subscribe(data => { 
            this.friends = data; 
            console.log(data);
        },
        err => { 
        	console.log("ERROR");

        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyFriendsPage');
  }


  viewUser(friend) {
    //this.nav.push(UserPage, {user: this.user})
    var id = friend.user_id;
    if(id == window.localStorage['current_user_id'])
    	id = friend.friend_id;

    this.url = 'http://talk-social.herokuapp.com/api/usuarios/' + id;
    this.http.get(this.url ).map(res => res.json()).subscribe(data => {
        console.log(data);
        this.user = data;
        //envia el json del usuario
        this.nav.push(UserPage, {user: this.user})
    }); 
  }//end viewUser

  

}
