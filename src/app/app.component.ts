import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//impor services
import {AreaService} from '../services/area-service';
//import { Ng2Cable } from 'ng2-cable/js/index';

// import page
import {HomePage} from '../pages/home/home';
import {UserPage} from '../pages/user/user';
import {NotificationsPage} from '../pages/notifications/notifications';
import {ContactsPage} from '../pages/contacts/contacts';
import {SettingPage} from '../pages/setting/setting';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {ChatsPage} from '../pages/chats/chats';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.component.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  tab1Root: any = LoginPage;
  tab2Root: any = RegisterPage;   
  tab3Root: any = HomePage;

  public areas: any;

  public rootPage:any;

  public nav:any;

  public tabBarElement:any;

  public pages = [
    {
      title: '#All',
      icon: 'ios-home-outline',
      count: 0,
      component: TabsPage,
      area: null
    },
    {
      title: '#Friends',
      icon: 'ios-list-box-outline',
      count: 0,
      component: TabsPage,
      area: null //modificar el servidor para que de los post de los amigos
    },
    {
      title: '#Ingenieras',
      icon: 'ios-mail-outline',
      count: 2,
      component: TabsPage,
      area: 779
    },
    {
      title: '#Negocios',
      icon: 'ios-notifications-outline',
      count: 5,
      component: TabsPage,
      area: 780
    },
    {
      title: '#Artes',
      icon: 'ios-browsers-outline',
      count: 0,
      component: TabsPage,
      area: 781
    },
    {
      title: '#Medicina',
      icon: 'ios-person-outline',
      count: 0,
      component: TabsPage,
      area: 782
    },
    {
      title: '#Memes',
      icon: 'ios-settings-outline',
      count: 0,
      component: TabsPage,
      area: 783
    },
    {
      title: '#CE',
      icon: 'ios-log-out-outline',
      count: 0,
      component: TabsPage,
      area: 784
    },
    {
      title: '#Final Exams',
      icon: 'ios-log-out-outline',
      count: 0,
      component: LoginPage,
      area: 785
    }
  ];

  constructor(public platform:Platform, public areaService: AreaService,public splashScreen: SplashScreen, public statusBar: StatusBar) {
    //this.rootPage = RegisterPage;
    //this.ng2cable.subscribe('https://talk-social.herokuapp.com/cable', 'NotificationChannel');

    areaService.getAll() //obtener las areas
      .then( areas => {
        var i;
        for(i in areas)
        {
            if(areas[i].goal == true) //checa si el area ya puede ser agregada -> goal=true
            {
              var json = {  //crear el objeto json con la area
                title: "#" + areas[i].title,
                icon: 'ios-log-out-outline',
                count: 0,
                component: TabsPage,
                area: areas[i].id
              }
              this.pages.push(json); //agregar a pages para que aparescan
            }
        }
    });


    if(window.localStorage['current_user_id'] === 'null') //si no ha iniciado sesion -> Register
    {
      this.rootPage = RegisterPage;
    }
    else //si ya inicio sesion se va a ->Tabs -> Home
    {
      this.rootPage = TabsPage;
    }
    // show splash screen
    this.splashScreen.show();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      // hide splash screen
      this.hideSplashScreen();
    });
  }





  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    window.localStorage['current_area_id'] = page.area; //guardar area en var para seleccionar la categoria y postear
    this.nav.setRoot(page.component,{});
  }

  // on click, go to user timeline
  viewUser(userId) {
    this.nav.push(UserPage, {id: userId})
  }

  // hide splash screen
  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    }
  }
}



/*

window.localStorage['current_area_id']
window.localStorage['current_user_id']
window.localStorage['current_user_avatar']

*/
