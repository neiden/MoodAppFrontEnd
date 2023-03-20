import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SpotifyPlaylistViewComponent } from './spotify-playlist-view/spotify-playlist-view.component';


const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'register', 
    component: LandingPageComponent
  },
  {
    path: 'home',
    //Change to actual home component when its done
    component: SpotifyPlaylistViewComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }