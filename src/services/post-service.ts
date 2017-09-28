import {Injectable} from "@angular/core";
import {POSTS} from "./mock-posts";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class PostService {
  private posts: any;
  public url: any;
  public whoLikes : any;
  public whoShares : any;

  constructor(public http: Http,private alertCtrl: AlertController, public loading: LoadingController) {
    this.posts = POSTS;
  }

  //Primera vez que obtiene POSTS
  getAll(area) {
    if(area != "null" && area != "undifined") // si seleccionó un area hace esto
      area = "?area=" + area;
    else //  si selecciono All o 1ra vez en entrar a la app le hace esto para cargar post
      area = "/" 

    console.log(area);
    let loader = this.loading.create({ //inicializar Loading
    content: 'Getting latest posts...',
    }); 

    if (!this.posts)
    {
        return Promise.resolve(this.posts);
    }

    return new Promise(resolve => {

      loader.present().then(() => { //presentar Loading

        this.url = 'https://talk-social.herokuapp.com/api/posts' + area;

        this.http.get(this.url ).map(res => res.json())
        .subscribe(data => { //Si pudo obtener los datos
            this.posts = data; //asigna los post
            resolve(this.posts);
            ///////
            loader.dismiss(); // quitar loading
            return this.posts; //regresa los post
        },
        err => { //Si no puede cargar los Post envia un alert para notificar al usuario.
            loader.dismiss(); // quitar Loading

            let alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'No connection with the server.',
            buttons: ['Ok']
            });

            alert.present(); //alerta 
        });
      });
    });
  
  }

  //Scroll Infinito para cargar mas POSTS
  getMore(pageN, area) {

    if (!this.posts)
    {
        return Promise.resolve(this.posts);
    }

    return new Promise(resolve => {

        if(area != "null" && area != "undifined") // si el area no es null
          this.url = 'https://talk-social.herokuapp.com/api/posts?page=' + pageN + "&area=" + area;
        else
          this.url = 'https://talk-social.herokuapp.com/api/posts?page=' + pageN;

        this.http.get(this.url ).map(res => res.json())
        .subscribe(data => {
            console.log(data);
            this.posts = data;
            resolve(this.posts);
            ///////
            console.log("ENTRO!");
            return this.posts;
        });
    });
  
  }


  //get who likes the post
  getLikes(idPost) {
    console.log("getLikes");
    console.log(idPost);

    return new Promise(resolve => {

        this.url = 'http://talk-social.herokuapp.com/api/likes/' + idPost + '?user_id=' + window.localStorage['current_user_id'] ;
        this.http.get(this.url).map(res => res.json())
        .subscribe(data => {
            console.log(data);
            this.whoLikes = data;
            resolve(this.whoLikes);
            ///////
            console.log("whoLikes obtenidas");
            return this.whoLikes;
        });
    });

  }


  //get who shares the post
  getShares(idPost) {
    console.log("getLikes");
    console.log(idPost);

    return new Promise(resolve => {

        this.url = 'http://talk-social.herokuapp.com/api/shares/' + idPost + '?user_id=' + window.localStorage['current_user_id'] ;
        this.http.get(this.url).map(res => res.json())
        .subscribe(data => {
            console.log(data);
            this.whoShares = data;
            resolve(this.whoShares);
            ///////
            console.log("whoShares obtenidas");
            return this.whoShares;
        });
    });

  }




  getItem(id) {
    for (var i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id === parseInt(id)) {
        return this.posts[i];
      }
    }
    return null;
  }

  remove(item) {
    this.posts.splice(this.posts.indexOf(item), 1);
  }
}