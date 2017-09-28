import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';


declare var cordova: any;
/*
  Generated class for the CreatePost page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-post',
  templateUrl: 'create-post.html'
})
export class CreatePostPage {

  public image: any;
  public text: any;
  public url: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,private alertCtrl: AlertController, private imagePicker: ImagePicker) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePostPage');
  }


  private openGallery (): void {
	  let options = {
	    maximumImagesCount: 1,
	    width: 500,
	    height: 500,
	    quality: 75
	  }

	  this.imagePicker.getPictures(options).then(
	  	//this._navCtrl.push(GalleryPage, {images: file_uris}      pasar a otra pagina con parametros
	    file_uris => {this.image =  file_uris; } ,
	    err => {console.log('uh oh')}
	  );
	}


  create()
  {
    var base64 = null
    if(this.image) //Si hay una imagen que enviar, la prepara para ser enviada
    {
      var image = new Image();
      image.src = this.image;
      base64 =  this.getBase64Image(image);
    }

  	this.url = 'http://talk-social.herokuapp.com/api/posts.json';

  	this.http.post(this.url, {post:{body:this.text, user_id: window.localStorage['current_user_id'],area: window.localStorage['current_area_id'], photo: base64 } , user_id: window.localStorage['current_user_id']})
        .subscribe(data => {
         console.log(data);
         this.navCtrl.pop();
        }, error => {
            console.log("Oooops!");
        });  
  }

  public getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/jpg");
  return dataURL;
  }


}




       /* let alert = this.alertCtrl.create({
    title: "title",
    subTitle: "subtitle",
    buttons: ['Dismiss']
    });
    alert.present(); */
