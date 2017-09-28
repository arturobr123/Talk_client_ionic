import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {UserPage} from '../user/user';

import { DataProvider } from '../../providers/data';
import { FirebaseProvider } from '../../providers/firebase';



@Component({
  selector: 'page-friendships',
  templateUrl: 'friendships.html',
})
export class FriendshipsPage {

  public url: any;
  public friendships: any;
  public user : any;

  constructor(public nav: NavController, public navParams: NavParams, public http: Http, public dataProvider: DataProvider, public firebaseProvider: FirebaseProvider) {

  	this.url = "http://talk-social.herokuapp.com/api/friendships?user_id=" + window.localStorage['current_user_id'];

        this.http.get(this.url ).map(res => res.json())
        .subscribe(data => { 
            this.friendships = data; 

        },
        err => { 
        	console.log("ERROR");

        });

  }



  updateFriendship(friendship, statuss)
  {
    //FIREBASE
     this.dataProvider.getUserWithUsername(friendship.UserFriend_username).subscribe((userFire) => { 
         
         console.log(String(userFire[0].userId));
         this.firebaseProvider.acceptFriendRequest(String(userFire[0].userId));


        }, error => {
            console.log("Oooops!");
        });
    

  	this.url = 'http://talk-social.herokuapp.com/api/updateFriendship.json';
        this.http.post(this.url, {id: friendship.id, status: String(statuss), user_id: window.localStorage['current_user_id']})
          .subscribe(data => {
           console.log(data);
           console.log("OK PERFECTO!!");
          }, error => {
              console.log("Oooops!");
        });


    
  }

  // on click, go to user timeline VIEW_USER //////
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendshipsPage');
  }

}
