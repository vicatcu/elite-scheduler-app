import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { TeamHomePage } from '../pages';
import { EliteApp } from '../../providers/elite-app';

import * as _ from "lodash";

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {
  teams = [];
  tournament: any;
  queryText: string = "";

  private allTeams: any;
  private allTeamDivisions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController, private eliteApi: EliteApp) {
    this.tournament = this.navParams.data;
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: "Getting data..."
    })

    loader.present().then(() => {
      this.eliteApi.getTournamentData(this.tournament.id).subscribe( data => {
        this.allTeams = data.teams;
        this.allTeamDivisions = _.chain(data.teams)
          .groupBy('division')
          .toPairs()
          .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
          .value();

        this.teams = this.allTeamDivisions;
        console.log('division teams', this.teams);
        loader.dismiss();
      });
    })
  }

  itemTapped($event, team) {
      this.navCtrl.push(TeamHomePage, team);
  }

  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];

    this.allTeamDivisions.forEach((d) => {
      let teams = d.divisionTeams.filter(t => t.name.toLowerCase().includes(queryTextLower));
      if(teams.length > 0){
        filteredTeams.push({divisionName: d.divisionName, divisionTeams: teams});
      }
    })

    this.teams = filteredTeams;
  }
}
