import {Component} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {LoginPage} from '../login/login';
import {TabsPage} from '../tabs/tabs';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { LoginProvider } from '../../providers/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public chat: any;
  public email: string;
  public username: string;
  public password: string;
  public url: any;

  constructor(public nav: NavController, public menu: MenuController, public http: Http, public loginProvider: LoginProvider) {
    // disable menu
    this.menu.swipeEnable(false);
  }


  register():any {

    this.loginProvider.register(this.email, this.password);
    console.log("Pasa sin problemas");


    this.url = 'https://talk-social.herokuapp.com/api/new_user_register.json';

    this.http.post(this.url, { email: this.email, password: this.password, username: this.username })
        .subscribe(data => {
            console.log(data);
            console.log("Register good!");
            var json = JSON.parse(data['_body']);
            window.localStorage['current_username'] = json.username;
            window.localStorage['current_user_id'] = json.userid;
   
            this.nav.setRoot(TabsPage);
            //this.nav.setRoot(HomePage);
        }
        , error => {
            console.log("Oooops!");
        });

    
    
  }



  login() {
    // add your check auth here
    this.nav.setRoot(LoginPage);
  }
}



/*


try
{
// Code which can cause an exception.
}
catch (Exception ex)
{
// Code to handle exception
}
 


*/