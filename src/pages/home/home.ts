import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {PostService} from '../../services/post-service';
import {PostPage} from '../post/post';
import {UserPage} from '../user/user';
import {CreatePostPage} from '../create-post/create-post';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LikesPage} from '../likes/likes';
import { SharesPage} from '../shares/shares';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[PostService]
})
export class HomePage {

  public posts: any;
  public url: any;
  public user: any;
  public post: any;
  public datos: any;
  public temporal: any;
  public pageN: any;
  public like: any;
  public area : any;
  createPost = CreatePostPage;

  constructor(public nav: NavController, public navParams: NavParams, public postService: PostService,public http: Http) {

    //numero de paginacion de json API post, inicia en 2
    this.pageN = 2;

    this.area = window.localStorage['current_area_id']; //area seleccionada
    //window.localStorage['current_area_id'] = this.area; //guardar area en var para postear

    postService.getAll(this.area) //obtener post mas recientes
      .then( posts => {
        
        this.posts = posts; //asignar post
    });
  //this.posts = postService.getAll();
  }


  //LIKES /////////////////////////
  toggleLike(post) { 
    if(this.alreadyLike(post)) {
      post.likes--;
/*
      var i;
      for(i in post.likesArray)
      {
        if(post.likesArray[i].user_id == window.localStorage['current_user_id'])
        {
          var idLike = post.likesArray[i].id; //encuentra el id del like que dió
          //Manda a destruir ese like
          this.url = 'http://talk-social.herokuapp.com/api/destroyLike.json';
          this.http.post(this.url, {id:idLike , user_id: window.localStorage['current_user_id']})
            .subscribe(data => {
             console.log(data);
            }, error => {
                console.log("Oooops!");
            });
        }
      }

*/

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

  //No me gusta DISLIKES////////////////////
  toggleDisLike(post) { 
    if(this.alreadyDisLike(post)) {
      post.dislikes--;
    } 
    else 
    {
      post.dislikes++;
      this.url = 'http://talk-social.herokuapp.com/api/dislikes.json';

      if(post.repost_id != null)
        this.temporal = post.repost_id
      else
        this.temporal = post.id

      this.http.post(this.url, {post_id:this.temporal , user_id: window.localStorage['current_user_id']})
        .subscribe(data => {
         console.log(data);
        }, error => {
            console.log("Oooops!");
        });

    }
    
    post.disliked = !post.disliked;
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



  // on click, go to post detail  VIEW-POST /////////
  viewPost(postId) {
    //this.nav.push(PostPage, {id: postId})
    this.url = 'http://talk-social.herokuapp.com/api/posts/' + postId;
    this.http.get(this.url ).map(res => res.json()).subscribe(data => {
        console.log(data);
        this.post = data;

        if(data.repost_id != null)
        {
          console.log("ENTRO!!");
          this.url = 'http://talk-social.herokuapp.com/api/posts/' + data.repost_id;
          this.http.get(this.url ).map(res => res.json()).subscribe(data2 => {
                console.log(data2);
                this.post = data2;
                this.nav.push(PostPage, {post: this.post})
          });

        }
        else
        {
          this.nav.push(PostPage, {post: this.post})
        }
        //envia el json del post
    }); 

    
  }// end viewPost

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


  // SCROLL INFINITO
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    this.loadPost().then(()=>{
       this.pageN++;
       infiniteScroll.complete();
     });
  }


  //CARGAR MAS POST
  loadPost(){

  return new Promise(resolve => {

      this.postService.getMore(this.pageN, this.area)
      .then( posts => {

        for(let post of posts) {
            this.posts.push(post);
          }

        resolve(true);

        });

    });

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


  //alreadyDisLike
  alreadyDisLike(post)
  {
    var i;
    for(i in post.dislikesArray)
    {
      if(post.dislikesArray[i].user_id == window.localStorage['current_user_id'])
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





}