import {Component} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {RegisterPage} from '../register/register';
import {TabsPage} from '../tabs/tabs';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { LoginProvider } from '../../providers/login';
import { ImageProvider } from '../../providers/image';
import { DataProvider } from '../../providers/data';

import * as firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public email: string;
  public password: string;
  public url: any;
  public user: any;

  constructor(public nav: NavController, public menu: MenuController,public http: Http, public loginProvider: LoginProvider,public imageProvider: ImageProvider, public dataProvider: DataProvider) {
    // disable menu
    window.localStorage['current_user_id'] = null;
    window.localStorage['current_username'] = null;
    window.localStorage['current_user_avatar'] = null;
    window.localStorage['uid_Firebase'] = null;
    this.menu.swipeEnable(false);

    firebase.auth().signOut().then((success) => {
      // Clear navigation stacks
      console.log("Cerrado de sesion completado con exito");
    });


  }

  register() {
    this.nav.setRoot(RegisterPage);
  }

  login():any {

    this.loginProvider.emailLogin(this.email, this.password);

    this.url = 'https://talk-social.herokuapp.com/api/authentication.json';

    this.http.post(this.url, { email: this.email,password: this.password})
        .subscribe(data => {
            console.log(data);
            console.log("It works!.");
            var json = JSON.parse(data['_body']);
            window.localStorage['current_username'] = json.username;
            window.localStorage['current_user_id'] = json.userid;

            this.nav.setRoot(TabsPage);
            //this.nav.setRoot(HomePage);
        }
        , error => {
            console.log("Oooops!");
        });
    // add your check auth here
    
  }
}




/*

    IT WORKS !!!!

    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("USER");
    console.log(user.uid);
  } else {
    console.log("NOT USER");
  }
});



*/
