import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class EliteApp {
  private baseUrl = 'https://elite-schedule-app-i2-babbd.firebaseio.com';
  currentTournament: any = {};
  tourneyData: any = {};

  constructor(public http: Http) {
    console.log('Hello EliteApp Provider');
  }

  getTournaments(){
      return this.http.get(`${this.baseUrl}/tournaments.json`)
              .map(response => {
                return response.json();
              });

  }

  // getTournamentData(tourneyId: string): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
  //     .map((response: Response) => {
  //       this.currentTournament = response.json();
  //       return this.currentTournament;
  //     })
  // }

  getTournamentData(tourneyId, forceRefresh: boolean = false) : Observable<any> {
      if (!forceRefresh && this.tourneyData[tourneyId]) {
          this.currentTournament = this.tourneyData[tourneyId];
          console.log('**no need to make HTTP call, just return the data');
          console.log("** ", this.currentTournament);
          return Observable.of(this.currentTournament);
      }

      // don't have data yet
      console.log('**about to make HTTP call');
      return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
          .map(response => {
              this.tourneyData[tourneyId] = response.json();
              this.currentTournament = this.tourneyData[tourneyId];
              console.log('**', this.currentTournament);
              return this.currentTournament;
          });
  }

  getCurrentTournament() {
    return Observable.of(this.currentTournament);
  }

  refreshCurrentTournament(){
    return this.getTournamentData(this.currentTournament.tournament.id, true);
  }
}
