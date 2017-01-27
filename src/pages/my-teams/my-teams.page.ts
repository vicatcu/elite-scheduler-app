import { LoadingController, NavController } from "ionic-angular";
import { Component } from '@angular/core';
import { TournamentsPage, TeamHomePage } from '../pages';
import { EliteApp, UserSettings } from '../../providers/shared';
@Component({

  selector: 'my-teams',
  templateUrl: './my-teams.page.html'
})
export class MyTeamsPage {

  favorites: any[];

  constructor(
    private nav: NavController,
    private eliteApi: EliteApp,
    private userSettings: UserSettings,
    private loadingCtrl: LoadingController) {

  }

  ionViewDidEnter() {
    this.userSettings.getAllFavorites().then( favorites => this.favorites = favorites );
  }

  goToTournaments() {
    this.nav.push( TournamentsPage );
  }

  itemTapped($event, item) {
    let loader = this.loadingCtrl.create({
      content: "Getting data..."
    })
    loader.present().then(() => {
      this.eliteApi.getTournamentData(item.tournamentId)
        .subscribe( t => {
          this.nav.push(TeamHomePage, item.team);
          loader.dismiss();
        });
    })
  }
}
