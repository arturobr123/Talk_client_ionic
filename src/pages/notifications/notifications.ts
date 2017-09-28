import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NotificationService} from '../../services/notification-service';
import {PostPage} from '../post/post';
import {UserPage} from '../user/user';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { Broadcaster } from 'ng2-cable/js/index';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  public notifications: any;
  public url: any;
  public post : any;
  public user: any;
  public pageN: any;

  constructor(public nav: NavController, public notificationService: NotificationService, public http: Http) {
    this.pageN = 1;
    notificationService.getAll(this.pageN)
    .then( notifications => {
        this.notifications = notifications; //asignar post
        this.pageN++;
    });
  }

/*
  ionViewDidLoad(){ //notificaciones en tiempo real
      this.broadcaster.on<string>('new_post').subscribe(
        notification => {
          this.notifications.push(notification);
          console.log(notification);
        }
      );
  } 

*/
  //Ver el post en el que se hizo una actividad
  viewPost(postId) { 
    this.url = 'http://talk-social.herokuapp.com/api/posts/' + postId;
    this.http.get(this.url ).map(res => res.json()).subscribe(data => {
        console.log(data);
        this.post = data;

        if(data.repost_id != null) //si el post es compartido
        {
          console.log("ENTRO!!");
          this.url = 'http://talk-social.herokuapp.com/api/posts/' + data.repost_id;
          this.http.get(this.url ).map(res => res.json()).subscribe(data2 => {
                console.log(data2);
                this.post = data2;
                this.nav.push(PostPage, {post: this.post})
          });

        }
        else // si el post NO es compartido
        {
          this.nav.push(PostPage, {post: this.post})  
        }

    }); 

     
  }// end viewPost



  viewUser(userId) { // on click, go to user timeline VIEW_USER 
    this.url = 'http://talk-social.herokuapp.com/api/usuarios/' + userId;
    this.http.get(this.url ).map(res => res.json()).subscribe(data => {
        console.log(data);
        this.user = data;
        //envia el json del usuario
        this.nav.push(UserPage, {user: this.user})
    }); 
  }//end viewUser



  // SCROLL INFINITO
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    this.loadNotifications().then(()=>{
       this.pageN++;
       infiniteScroll.complete();
     });
  }


  //CARGAR MAS POST
  loadNotifications(){

  return new Promise(resolve => {

      this.notificationService.getAll(this.pageN)
      .then( notifications => {

        for(let notification of notifications) {
            this.notifications.push(notification);
          }

        resolve(true);

        });

    });

  }





}