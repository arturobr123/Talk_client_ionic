import {Injectable} from "@angular/core";
import {POSTS} from "./mock-posts";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class AreaService {
  private posts: any;
  private areas: any;
  public url: any;

  constructor(public http: Http,private alertCtrl: AlertController, public loading: LoadingController) {
      this.posts = POSTS;
  }

  //Primera vez que obtiene Areas
  getAll() {
    
    console.log("getAll Areas");
    let loader = this.loading.create({ //inicializar Loading
    content: 'Getting latest areas...',
    }); 

    if (!this.posts)
    {
        return Promise.resolve(this.posts);
    }

    return new Promise(resolve => {

      loader.present().then(() => { //presentar Loading

        this.url = "http://talk-social.herokuapp.com/api/areas";

        this.http.get(this.url ).map(res => res.json())
        .subscribe(data => { //Si pudo obtener los datos
            this.areas = data; //asigna las areas
            resolve(this.areas);
            ///////
            loader.dismiss(); // quitar loading
            return this.areas; //regresa las areas
        },
        err => { //Si no puede cargar las Areas envia un alert para notificar al usuario.
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