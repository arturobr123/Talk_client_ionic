import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {PostService} from '../../services/post-service';
import {UserPage} from '../user/user';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
  public post: any;
  public newComment: any;
  public url: any;
  public user: any;

  constructor(public nav: NavController, public postService: PostService,public navParams: NavParams,public http: Http) {
    // get sample data only
    //this.post = postService.getItem(navParams.get('id'));
    //this.post = postService.getItem(0);
    this.post = navParams.get('post');
  }

  toggleLike(post) {
    // if user liked
    if(post.liked) {
      post.likeCount--;
    } else {
      post.likeCount++;
    }

    post.liked = !post.liked
  }

  


  sendComment(){

    this.url = 'https://talk-social.herokuapp.com/api/comments.json';

    this.http.post(this.url, 
        {
        commenter: window.localStorage['current_username'],
        body: this.newComment,
        post_id: this.post.id,
        user_id: window.localStorage['current_user_id']})

        .subscribe(data => {
          
            if (this.newComment) {
              this.post.comments.push({
                user_avatar: window.localStorage['current_user_avatar'],
                commenter: window.localStorage['current_username'],
                body: this.newComment,
                post_id: this.post.id,
                user_id: window.localStorage['current_user_id']})
              }

              // clear input
              this.newComment = '';
            }


        , error => {
            console.log("Oooops!");
        });

    }



  // on click, go to user timeline
  viewUser(userId) {
    this.url = 'http://talk-social.herokuapp.com/api/usuarios/' + userId;
    this.http.get(this.url ).map(res => res.json()).subscribe(data => {
        console.log(data);
        this.user = data;
        //envia el json del usuario
        this.nav.push(UserPage, {user: this.user})
    }); 
  }
}
