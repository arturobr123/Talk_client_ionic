import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserService} from '../../services/user-service';
import {PostService} from '../../services/post-service';
import {PostPage} from '../post/post';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {FriendshipsPage} from '../friendships/friendships';
import {MyFriendsPage} from '../my-friends/my-friends';
import { LikesPage} from '../likes/likes';
import { SharesPage} from '../shares/shares';

import { DataProvider } from '../../providers/data';
import { FirebaseProvider } from '../../providers/firebase';


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  public user: any;
  public bgImage:any;
  public url: any;
  public post: any;
  public love: any;
  public pageN: any;
  public temporal: any;
  public alreadySendFriendshipp: any;
  public userFirebase: any;

  constructor(public nav: NavController, public navParams: NavParams, public userService: UserService, public postService: PostService,private sanitizer: DomSanitizer,public http: Http, public dataProvider: DataProvider, public firebaseProvider: FirebaseProvider) {

    this.pageN = 2;
    this.user = navParams.get('user');//recibe el json del usuario
    this.bgImage = sanitizer.bypassSecurityTrustStyle('url('+this.user.cover_url+')'); //imagen cover sanitizada
    this.love = this.getLove(); //cuantos likes tiene en total
    this.alreadySendFriendship(); //checa si ya son amigos

    //obtiene usuario de firebase //FIREBASE
    this.dataProvider.getUserWithUsername(this.user.username).subscribe((userFire) => { 
         this.userFirebase = userFire;
         console.log(userFire);

        }, error => {
            console.log("Oooops!");
        });
    


    //[style.background-image]="bgImage"        se pone en el div

    Object.assign(this.user, {
      'Friends': this.user.friends.length,
      'Love': this.love,
      'PostsCount': this.user.lengthAllPost,
      'posts': this.user.posts.reverse() //postService.getAll()
    });

  }


 //LIKES /////////////////////////
  toggleLike(post) { 
    if(this.alreadyLike(post)) {
      post.likes--;
    } 
    else 
    {
      post.likes++;
      this.url = 'http://talk-social.herokuapp.com/api/likes.json';

      if(post.repost_id != null)
        this.temporal = post.repost_id
      else
        this.temporal = post.id

      this.http.post(this.url, {id:this.temporal , user_id: window.localStorage['current_user_id']})
        .subscribe(data => {
         console.log(data);
        }, error => {
            console.log("Oooops!");
        });

    }
    
    post.liked = !post.liked;
  }


  //SHARE ///////////////////////
  sharePost(post) { 
    if(this.alreadyShare(post)) {
      post.shares--;
    }//end if
    else 
    {
      post.shares++;
      if(post.repost_id != null)
        this.temporal = post.repost_id
      else
        this.temporal = post.id

      this.url = 'http://talk-social.herokuapp.com/api/repost.json';// crear post compartido
        this.http.post(this.url, {id:this.temporal , user_id: window.localStorage['current_user_id']})
        .subscribe(data => {
         console.log(data);
        }, error => {
            console.log("Oooops!");
        });

      this.url = 'http://talk-social.herokuapp.com/api/shares.json'; //crear tupla en tabla shares
        this.http.post(this.url, {id:this.temporal , user_id: window.localStorage['current_user_id']})
        .subscribe(data => {
         console.log(data);
        }, error => {
            console.log("Oooops!");
        }); 

    }//end else

    post.shared = !post.shared
  }





  //alreadyLike
  alreadyLike(post)
  {
    var i;
    for(i in post.likesArray)
    {
      if(post.likesArray[i].user_id == window.localStorage['current_user_id'])
      {
        return true;
      }

    }
     
    return false;

  }

  //alreadyShare
  alreadyShare(post)
  {
    var i;
    for(i in post.sharesArray)
    {
      if(post.sharesArray[i].user_id == window.localStorage['current_user_id'])
      {
        return true;
      }

    }
    return false;

  }



  // on click, go to post detail
  viewPost(postId) {
    //this.nav.push(PostPage, {id: postId})
    this.url = 'http://talk-social.herokuapp.com/api/posts/' + postId;
    this.http.get(this.url ).map(res => res.json()).subscribe(data => {
        console.log(data);
        this.post = data;
        //envia el json del post
        this.nav.push(PostPage, {post: this.post})
    }); 

    
  }

  // on click, go to user timeline
  viewUser(userId) {
    //this.nav.push(UserPage, {user: this.user})
    this.url = 'http://talk-social.herokuapp.com/api/usuarios/' + userId;
    this.http.get(this.url ).map(res => res.json()).subscribe(data => {
        console.log(data);
        this.user = data;
        //envia el json del usuario
        this.nav.push(UserPage, {user: this.user})
    }); 
  }


  //get how many likes (love) has
  getLove(){
    var i;
    var likes = 0;
    for(i in this.user.posts)
    {
       likes = likes + this.user.posts[i].likes;
       console.log(likes);
    }
    console.log(likes);
    return likes;
  }



  // SCROLL INFINITO
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    this.loadPostUser().then(()=>{
       this.pageN++;
       infiniteScroll.complete();
     });
  }



  //CARGAR MAS POST
  loadPostUser(){

  return new Promise(resolve => {

      this.url = 'http://talk-social.herokuapp.com/api/usuarios/' + window.localStorage['current_user_id'] +"?page=" + this.pageN;
      this.http.get(this.url ).map(res => res.json()).subscribe(data => {

        for(let postUser of data.posts) {
            this.user.posts.push(postUser);
          }

        resolve(true);

      }); 

    });

  }


  viewFriendships()
  {
    this.nav.push(FriendshipsPage, {})
  }

  viewMyFriends()
  {
    this.nav.push(MyFriendsPage, {userID: this.user.id})
  }


  alreadyFriends()
  {
    var i;
    for(i in this.user.friends)
    {
      if(this.user.friends[i] == window.localStorage['current_user_id'])
      {
        return true;
      }

    }
     
    return false;

  }

  thisIsMe()
  {
    if(this.user.id ==  window.localStorage['current_user_id'])
    {
      
      return true;
    }
    else
    {
      
      return false;
    }

  }

  alreadySendFriendship()
  {
      this.url = 'http://talk-social.herokuapp.com/api/areWeFriends?user_id=' + window.localStorage['current_user_id'] + '&friend_id=' + this.user.id ;
      this.http.get(this.url ).map(res => res.json()).subscribe(data => {

          console.log(data);
          

          if(data.SonAmigos == true)
          {
            console.log("aaaaaahhhhhh");
            this.alreadySendFriendshipp = true;
            
          }
          else
          {
            console.log("oooohhhhhh");
            this.alreadySendFriendshipp = false;
          }
          
        });

  }


  createFriendship()
  {
    console.log("ID del usuario en firebase");  //FIREBASE
    console.log(this.userFirebase[0].userId);   //FIREBASE
    this.firebaseProvider.sendFriendRequest(this.userFirebase[0].userId); //FIREBASE crear solicitud en firebase


    this.url = 'http://talk-social.herokuapp.com/api/friendships.json';

    this.http.post(this.url, {user_id: window.localStorage['current_user_id'] , friend_id: this.user.id})
        .subscribe(data => {
         console.log(data);
         console.log("Solicitud de amistad enviada");
        }, error => {
            console.log("Oooops!");
        });



  }


   //View who likes
   whoLikes(post) {

    if(post.repost_id != null)
        this.temporal = post.repost_id
      else
        this.temporal = post.id
    
    this.nav.push(LikesPage, {idPost: this.temporal})

  }//end whoLikes


  //View who likes
   whoShares(post) {

    if(post.repost_id != null)
        this.temporal = post.repost_id
      else
        this.temporal = post.id
    
    this.nav.push(SharesPage, {idPost: this.temporal})

  }//end whoLikes



}
