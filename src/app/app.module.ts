import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
 import { App, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ImagePicker } from '@ionic-native/image-picker';
//import { ElasticModule } from 'angular2-elastic';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule} from '@angular/http';

//CHAT !!!!!!!!!!!!!!!!!!!!!
import { Camera } from '@ionic-native/camera';
import { GooglePlus } from '@ionic-native/google-plus';
import { Keyboard } from '@ionic-native/keyboard';

import { VerificationPage } from '../pages/verification/verification';
import { TrialPage } from '../pages/trial/trial';
import { MessagesPage } from '../pages/messages/messages';
import { FriendsPage } from '../pages/friends/friends';
import { SearchPeoplePage } from '../pages/search-people/search-people';
import { RequestsPage } from '../pages/requests/requests';
import { UserInfoPage } from '../pages/user-info/user-info';
import { NewMessagePage } from '../pages/new-message/new-message';
import { MessagePage } from '../pages/message/message';
import { ImageModalPage } from '../pages/image-modal/image-modal';

import { LoginProvider } from '../providers/login';
import { LogoutProvider } from '../providers/logout';
import { LoadingProvider } from '../providers/loading';
import { AlertProvider } from '../providers/alert';
import { ImageProvider } from '../providers/image';
import { DataProvider } from '../providers/data';
import { FirebaseProvider } from '../providers/firebase';

import * as firebase from 'firebase';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';


import { Login } from '../login';

import { FriendPipe } from '../pipes/friend';
import { SearchPipe } from '../pipes/search';
import { ConversationPipe } from '../pipes/conversation';
import { DateFormatPipe } from '../pipes/date';
import { GroupPipe } from '../pipes/group';

//CHAT !!!!!!!!!!!!

// import services
import {PostService} from '../services/post-service';
import {AreaService} from '../services/area-service';
import {UserService} from '../services/user-service';
import {NotificationService} from '../services/notification-service';
import {ChatService} from '../services/chat-service';
//import { Ng2Cable, Broadcaster } from 'ng2-cable/js/index';
// end import services

// import pages
import { ChatDetailPage} from '../pages/chat-detail/chat-detail';
import { ChatsPage} from '../pages/chats/chats';
import { ContactsPage} from '../pages/contacts/contacts';
import { HomePage} from '../pages/home/home';
import { LoginPage} from '../pages/login/login';
import { NotificationsPage} from '../pages/notifications/notifications';
import { PostPage} from '../pages/post/post';
import { RegisterPage} from '../pages/register/register';
import { SettingPage} from '../pages/setting/setting';
import { UserPage} from '../pages/user/user';
import { TabsPage } from '../pages/tabs/tabs';
import { CreatePostPage} from '../pages/create-post/create-post';
import { AreasPage} from '../pages/areas/areas';
import { CreateAreaPage} from '../pages/create-area/create-area';
import { FriendshipsPage} from '../pages/friendships/friendships';
import { MyFriendsPage} from '../pages/my-friends/my-friends';
import { LikesPage} from '../pages/likes/likes';
import { SharesPage} from '../pages/shares/shares';






// end import pages AreasPage

@NgModule({
  declarations: [
    MyApp,
    ChatDetailPage,
    ChatsPage,
    ContactsPage,
    HomePage,
    TabsPage,
    LoginPage,
    NotificationsPage,
    PostPage,
    RegisterPage,
    SettingPage,
    UserPage,
    CreatePostPage,
    AreasPage,
    CreateAreaPage,
    FriendshipsPage,
    MyFriendsPage,
    LikesPage,
    SharesPage,


    VerificationPage,
    TrialPage,
    MessagesPage,
    FriendsPage,
    SearchPeoplePage,
    RequestsPage,
    UserInfoPage,
    NewMessagePage,
    MessagePage,
    ImageModalPage,
    FriendPipe,
    ConversationPipe,
    SearchPipe,
    DateFormatPipe,
    GroupPipe
],
  imports: [
    BrowserModule,
    HttpModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      scrollAssist: false,
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(Login.firebaseConfig, { method: AuthMethods.Password, provider: AuthProviders.Password })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatDetailPage,
    ChatsPage,
    ContactsPage,
    HomePage,
    LoginPage,
    NotificationsPage,
    PostPage,
    TabsPage,
    RegisterPage,
    SettingPage,
    UserPage,
    CreatePostPage,
    AreasPage,
    CreateAreaPage,
    FriendshipsPage,
    MyFriendsPage,
    LikesPage,
    SharesPage,
    

    VerificationPage,
    TrialPage,
    MessagesPage,
    FriendsPage,
    SearchPeoplePage,
    RequestsPage,
    UserInfoPage,
    NewMessagePage,
    MessagePage,
    ImageModalPage
],
  providers: [
    StatusBar,
    ImagePicker,
    SplashScreen,
    PostService,
    UserService,
    NotificationService,
    ChatService,
    AreaService,


    Camera, GooglePlus, Keyboard,
    LoginProvider, LogoutProvider, LoadingProvider, AlertProvider, ImageProvider, DataProvider, FirebaseProvider

    /* import services */
]
})
export class AppModule {}
