import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoodAPIService } from '../mood-api.service';
import { SpotifyApiService } from '../spotify-api.service';
import { Account, User } from 'src/models/account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
   
    
    
    name : string ="";
    playlistNum : any;
    postNum : any; 
    friendsNum : any;
    location : string = "";
    textInput : FormControl = new FormControl('');
    posts : any[] = [];
    user? : User = undefined;
    id : any;
    constructor(private router:Router, private m_service : MoodAPIService, private s_service : SpotifyApiService, private activatedRoute: ActivatedRoute){}

    ngOnInit(){
        //call all functions to populate everything
        this.activatedRoute.params.subscribe(params => {
          console.log('params', params);
          //get all accounts
          this.m_service.getAllUsers().subscribe((data) => {
            this.user = data.find(u => u.user_Id === parseInt(params['user']));
            console.log(this.user);
          })
          
          // console.log(params['user'].toString());
          // this.m_service.loginUser(params['user'],params['pwd']).subscribe(data => {
          //   console.log(data);
          // })
        })
    }

    getUserInfo(){
      //request to get name or passed from login? 

    }

    getPosts(){
      //get all user posts
    }

    getFriends(){
      //get all user posts
    }

    getPlaylist(){
      //get all user posts
    }

    getLoc() : void{
      this.m_service.getLocation().subscribe(data => console.log(data));
    }
}
