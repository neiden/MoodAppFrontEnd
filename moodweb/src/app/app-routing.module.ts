import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SpotifyPlaylistViewComponent } from './spotify-playlist-view/spotify-playlist-view.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { FriendsComponent } from './friends/friends.component';
import { FriendProfileComponent } from './friend-profile/friend-profile.component';
import { CommentComponent } from './comment/comment.component'; 


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
    path: 'home/:id',
    component: FeedComponent
  },
  {
    path: 'home',
    component: FeedComponent
  },
  {
    path: 'comment',
    component: CommentComponent
  },
  {
    path: 'spotify',
    component: SpotifyPlaylistViewComponent
  },
  {
    path: 'profile/:user',
    component: ProfileComponent
  },
  {
    path: 'profilesettings/:id',
    component: ProfileSettingComponent
  },
  {
    path: 'friends',
    component: FriendsComponent
  },
  {
    path: 'fprofile/:id',
    component: FriendProfileComponent
  },
  {
    path: 'friends/:id',
    component: FriendsComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }