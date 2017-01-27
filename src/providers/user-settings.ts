import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class UserSettings {

  constructor(public storage: Storage, private events: Events) {

  }

  favoriteTeam(team, tournamentId, tournamentName){
    let item = { team, tournamentId, tournamentName };
    this.storage.set(`${team.id}`, JSON.stringify(item));
    this.events.publish("favorites:changed")
  }

  unfavoriteTeam(team){
    this.storage.remove(`${team.id}`);
    this.events.publish("favorites:changed")
  }

  isFavoriteTeam(teamId){
    return this.storage.get(`${teamId}`).then(value => value ? true : false);
  }

  getAllFavorites(){
    return this.storage.ready().then(() => {
      let items = [];
      return this.storage.forEach((value, key) => {
        console.log(`${key} => ${value}`);
        items.push(JSON.parse(value));
      }).then(() => {
        return items.length ? items : null;
      });
    });
  }
}
