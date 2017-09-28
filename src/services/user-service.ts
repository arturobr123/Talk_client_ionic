import {Injectable} from "@angular/core";
import {USERS} from "./mock-users";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private users;
  private user;
  public url: any;

  constructor(public http: Http) {
    this.users = USERS;
  }

  getUser() //Aun no se usa
  {

    return new Promise(resolve => {

        this.url =  'http://talk-social.herokuapp.com/api/usuarios/' + window.localStorage['current_user_id'];

        this.http.get(this.url ).map(res => res.json())
        .subscribe(data => {
            console.log(data);
            this.user = data;
            resolve(this.user);
            ///////
            return this.user;
        });
    });
  }

  //DEFAUT!!!!!!!!!!!!!!
  getAll() {
    return this.users;
  }

  getItem(id) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id === parseInt(id)) {
        return this.users[i];
      }
    }
    return null;
  }

  remove(item) {
    this.users.splice(this.users.indexOf(item), 1);
  }
}