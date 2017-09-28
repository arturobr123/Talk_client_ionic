import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, App } from 'ionic-angular';
import { LogoutProvider } from '../../providers/logout';
import { LoadingProvider } from '../../providers/loading';
import { AlertProvider } from '../../providers/alert';
import * as firebase from 'firebase';
import { Facebook } from 'ng2-cordova-oauth/core';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { Login } from '../../login';
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
  selector: 'page-trial',
  templateUrl: 'trial.html'
})
export class TrialPage {
  // TrialPage
  // This is the page where the user is redirected when they logged in as guest.
  // From this page, the guest can upgrade to a full account by logging in via Facebook or Google.
  private alert;
  private oauth: OauthCordova;
  private facebookProvider = new Facebook({
    clientId: Login.facebookAppId,
    appScope: ["email"]
  });

  constructor() {

  }

}

 