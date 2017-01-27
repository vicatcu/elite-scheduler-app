import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { MyTeamsPage, TournamentsPage, TeamHomePage } from '../pages/pages';
import { EliteApp, UserSettings } from '../providers/shared';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any = MyTeamsPage;

  constructor(
    public platform: Platform,
    private userSettings: UserSettings,
    private loadingCtrl: LoadingController,
    private events: Events,
    private eliteApi: EliteApp) {
    this.initializeApp();
  }

  refreshFavorites() {
    this.userSettings.getAllFavorites().then(favorites => this.favoriteTeams = favorites);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.refreshFavorites();

      this.events.subscribe("favorites:changed", () => {
        this.refreshFavorites();
      });
    });
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  goToTeam(fav){
    let loader = this.loadingCtrl.create({
      content: "Getting data..."
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(fav.tournamentId).subscribe(t => {
        console.log(fav.team);
        this.nav.push(TeamHomePage, fav.team);
        loader.dismiss();
      });
    });
  }
}
