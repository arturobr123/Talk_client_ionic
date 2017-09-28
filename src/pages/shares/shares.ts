import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {UserPage} from '../user/user';
import {PostService} from '../../services/post-service';

/**
 * Generated class for the SharesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-shares',
  templateUrl: 'shares.html',
  providers:[PostService]
})
export class SharesPage {

  public whoShares : any;
  public url: any;
  public user : any;
  public idPost : any;	

  constructor(public nav: NavController, public navParams: NavParams, public http: Http, public postService: PostService) {
  	this.idPost = navParams.get('idPost');
  	console.log(this.idPost);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharesPage');

    //Obtener quienes le dieron share al post
    this.postService.getShares(this.idPost)
    .then( data => {
        this.whoShares = data; //asignar who shares
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

}
