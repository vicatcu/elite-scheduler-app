import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApp } from '../../providers/elite-app';

import * as _ from "lodash";

@Component({
  selector: 'page-team-standings',
  templateUrl: 'team-standings.html'
})
export class TeamStandingsPage {

  team: any;
  standings: any[];
  divisionFilter: string = "division";
  allStandings: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private eliteApi: EliteApp) { }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.eliteApi.getCurrentTournament().subscribe((tournamentData) => {
      this.standings = tournamentData.standings;

      // this.allStandings = _.chain(this.standings)
      //   .groupBy('division')
      //   .toPairs()
      //   .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
      //   .value();

      this.allStandings = tournamentData.standings;
      this.filterDivision();
    });
  }

  getHeader(record, recordIndex, records){
    if(recordIndex === 0 || record.division !== records[recordIndex - 1].division){
      return record.division;
    }
    return null;
  }

  filterDivision(){
    switch(this.divisionFilter){
      case 'all':
        this.standings = this.allStandings;
        break;
      case 'division':
      default:
        this.standings = this.allStandings.filter(s => s.division === this.team.division);
    }
  }
}
