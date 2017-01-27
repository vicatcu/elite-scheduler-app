import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';

import { TeamsPage } from '../pages';

import { EliteApp } from '../../providers/elite-app';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html'
})
export class TournamentsPage {


  tournaments: any;
  constructor(public nav: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController, private eliteApi: EliteApp) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TournamentsPage');
    let loader = this.loadingCtrl.create({
      content: "Getting tournaments..."
    });

    loader.present().then(() => {
      this.eliteApi.getTournaments().subscribe((data) => {
        this.tournaments = data;
        loader.dismiss();
      });
    });

  }

  itemTapped($event, tournament) {
    this.nav.push(TeamsPage, tournament);
  }

}
