import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApp } from '../../providers/elite-app';

declare var window: any; //trust me it will be there at runtime

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  game: any = null;
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApp ) {
    this.game = this.navParams.data;
  }

  ionViewDidLoad() {
    this.eliteApi.getCurrentTournament().subscribe((t) => {
      let location = t.locations[this.game.locationId];
      this.map = {
        lat: location.latitude,
        lng: location.longitude,
        zoom: 12,
        markerLabel: this.game.location
      }
    })
  }

  getDirections(){
    this.eliteApi.getCurrentTournament().subscribe((t) => {
      let location = t.locations[this.game.locationId];
      window.location = `geo:${location.latitude},${location.longitude};u=35;`;
    });
  }

}
