import {Injectable} from "@angular/core";
import {NOTIFICATIONS} from "./mock-notifications";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {
  private notifications: any;
  public url: any;

  constructor(public http: Http) {
    this.notifications = NOTIFICATIONS;
  }

  getAll(page) {
    
    if (!this.notifications)
    {
        return Promise.resolve(this.notifications);
    }

    return new Promise(resolve => {

        this.url = 'http://talk-social.herokuapp.com/api/notifications?user_id=' + window.localStorage['current_user_id'] + "&page=" + page;
        this.http.get(this.url).map(res => res.json())
        .subscribe(data => {
            console.log(data);
            this.notifications = data;
            resolve(this.notifications);
            ///////
            console.log("Notificaciones obtenidas");
            return this.notifications;
        });
    });

  }

  getBeforeNotifications(){
    return this.notifications;
  }

  getItem(id) {
    for (var i = 0; i < this.notifications.length; i++) {
      if (this.notifications[i].id === parseInt(id)) {
        return this.notifications[i];
      }
    }
    return null;
  }

  remove(item) {
    this.notifications.splice(this.notifications.indexOf(item), 1);
  }
}