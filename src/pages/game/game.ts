import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TeamHomePage, MapPage } from '../pages';
import { EliteApp } from '../../providers/elite-app';

declare var window: any; //trust me it exists at runtime

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

  game: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApp) {
      this.game = this.navParams.data;
      this.game.gameTime = Date.parse(this.game.time);
    }

  ionViewDidLoad() {
    console.log(this.game);
  }

  teamTapped(teamId) {
    this.eliteApi.getCurrentTournament().subscribe((tournamentData) => {
      let team = tournamentData.teams.find(t => t.id === teamId);
      this.navCtrl.push(TeamHomePage, team);
    });
  }

  goToDirections(){
    this.eliteApi.getCurrentTournament().subscribe((t) => {
      let location = t.locations[this.game.locationId];
      window.location = `geo:${location.latitude},${location.longitude};u=35;`;
    });
  }

  goToMap(){
    this.navCtrl.push(MapPage, this.game);
  }

  isWinner(score1, score2){
    return Number(score1) > Number(score2);
  }

}
