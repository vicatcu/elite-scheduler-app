import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { MyTeamsPage, GamePage, TeamDetailPage, TournamentsPage, TeamsPage,
  TeamHomePage, TeamStandingsPage, MapPage } from '../pages/pages';
import { EliteApp, UserSettings } from '../providers/shared.ts';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamDetailPage,
    TournamentsPage,
    TeamsPage,
    TeamHomePage,
    TeamStandingsPage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDjuif_gV5uKQJNMemDdV8jFKTLxHeXK2Q'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamDetailPage,
    TournamentsPage,
    TeamsPage,
    TeamHomePage,
    TeamStandingsPage,
    MapPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteApp,
    UserSettings,
    Storage
  ]
})
export class AppModule {}
