import { Component } from '@angular/core';
import { NavController, NavParams,  App} from 'ionic-angular';
import {HomePage} from '../home/home';
import {UserPage} from '../user/user';
import {NotificationsPage} from '../notifications/notifications';
import {AreasPage} from '../areas/areas';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { MessagesPage } from '../messages/messages';
import { FriendsPage } from '../friends/friends';
import { DataProvider } from '../../providers/data';


import * as firebase from 'firebase';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public url: any;
  public user: any;
  tab1Root: any = HomePage;
  tab2Root: any = NotificationsPage;
  tab3Root: any = AreasPage;//
  messages: any = MessagesPage;
  tab5Root: any = UserPage;

  friends: any = FriendsPage;
  profile: any = HomePage;

  //chat
  private unreadMessagesCount: any;
  private friendRequestCount: any;
  private conversationList: any;
  private conversationsInfo: any;


  constructor(public nav: NavController, public navParams: NavParams,public http: Http, public app: App, public dataProvider: DataProvider) {this.getUser();}

  ionViewDidLoad() {
    // Get friend requests count.
    console.log("TABS");
    console.log(firebase.auth());

                                  //firebase.auth().currentUser.uid
    this.dataProvider.getRequests(window.localStorage['uid_Firebase']).subscribe((requests) => {
      if (requests.friendRequests) {
        this.friendRequestCount = requests.friendRequests.length;
      } else {
        this.friendRequestCount = null;
      }
    });

    // Get conversations and add/update if the conversation exists, otherwise delete from list.
    this.dataProvider.getConversations().subscribe((conversationsInfo) => {
      this.unreadMessagesCount = null;
      this.conversationsInfo = null;
      this.conversationList = null;
      if (conversationsInfo.length > 0) {
        this.conversationsInfo = conversationsInfo;
        conversationsInfo.forEach((conversationInfo) => {
          this.dataProvider.getConversation(conversationInfo.conversationId).subscribe((conversation) => {
            if (conversation.$exists()) {
              this.addOrUpdateConversation(conversation);
            }
          });
        });
      }
    });


  }



  // Add or update conversaion for real-time sync of unreadMessagesCount.
  addOrUpdateConversation(conversation) {
    if (!this.conversationList) {
      this.conversationList = [conversation];
    } else {
      var index = -1;
      for (var i = 0; i < this.conversationList.length; i++) {
        if (this.conversationList[i].$key == conversation.$key) {
          index = i;
        }
      }
      if (index > -1) {
        this.conversationList[index] = conversation;
      } else {
        this.conversationList.push(conversation);
      }
    }
    this.computeUnreadMessagesCount();
  }

  // Compute all conversation's unreadMessages.
  computeUnreadMessagesCount() {
    this.unreadMessagesCount = 0;
    if (this.conversationList) {
      for (var i = 0; i < this.conversationList.length; i++) {
        this.unreadMessagesCount += this.conversationList[i].messages.length - this.conversationsInfo[i].messagesRead;
        if (this.unreadMessagesCount == 0) {
          this.unreadMessagesCount = null;
        }
      }
    }
  }

  getUnreadMessagesCount() {
    if (this.unreadMessagesCount) {
      if (this.unreadMessagesCount > 0) {
        return this.unreadMessagesCount;
      }
    }
    return null;
  }










  getUser() {
    //this.nav.push(UserPage, {user: this.user})
    this.url = 'http://talk-social.herokuapp.com/api/usuarios/' + window.localStorage['current_user_id'] +"?page=" + 1;
    this.http.get(this.url ).map(res => res.json()).subscribe(data => {
        console.log(data);
        this.user = data; //obtiene usuario para cuando vaya a UserPage
        window.localStorage['current_user_avatar'] =  this.user.avatar_url;
        this.user.posts = this.user.posts.reverse();
    }); 
  } 

}
