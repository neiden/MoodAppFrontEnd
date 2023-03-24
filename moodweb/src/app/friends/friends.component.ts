import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoodAPIService } from '../mood-api.service';
import { SpotifyApiService } from '../spotify-api.service';
import { Account, User, Post, Playlist, Mood} from 'src/models/account';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit{

  u_id : any; 
  friendsList : User[] =[];
  
  constructor(private router:Router, private m_service : MoodAPIService, private s_service : SpotifyApiService, private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log('params', params);
    });
  }


  goFriendProfile(uid:any, fid:any){
    this.router.navigate(['fprofile', {uid:uid, fid:fid}]);
  }
}
