import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CreateArea page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-area',
  templateUrl: 'create-area.html'
})
export class CreateAreaPage {
  public title : any;
  public description : any;
  public url: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAreaPage');
  }


  create()
  {

  	this.url = 'http://talk-social.herokuapp.com/api/areas.json';

  	this.http.post(this.url, {area:{title:this.title, user_id: window.localStorage['current_user_id'], description: this.description } , user_id: window.localStorage['current_user_id']})
        .subscribe(data => {
         console.log(data);
         this.navCtrl.pop();
        }, error => {
            console.log("Oooops!");
        });  
  } 

}
