
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoodAPIService } from '../mood-api.service';
import { SpotifyApiService } from '../spotify-api.service';
import { Account, User, Post, Playlist, Mood} from 'src/models/account';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit{
  u_Id: any;
  friendsList: User[] = [];

  constructor(private router:Router, private m_service : MoodAPIService, private s_service : SpotifyApiService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.u_Id = parseInt(data['id']);
    });

    this.getFriends();

  }

  //populate list of users on init
  //reflect contents of users in html

  getFriends(){
    this.service.getAllFriends(this.u_Id).subscribe((data : any) => {
      if(data != null){
        console.log(data);
        for (var i = 0; i < data.length;i++){
          var user = {} as User;
          user.f_Name = data[i]['f_Name'];
          user.l_Name = data[i]['l_Name'];
          user.birthdate = formatDate(new Date(data[i]['birthdate']), 'MM/dd', 'en');
          user.phone_Number = data[i]['phone_Number'];
          user.zipcode = data[i]['zipcode'];
          user.user_Id = data[i]['user_Id'];
          this.friendsList.push(user);
        }
      }
    });
  }
}
