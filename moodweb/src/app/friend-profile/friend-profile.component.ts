import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoodAPIService } from '../mood-api.service';
import { SpotifyApiService } from '../spotify-api.service';
import { Account, User, Post } from 'src/models/account';
import { MapGeocoderResponse} from 'src/models/geocoder-response.model'

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.css']
})
export class FriendProfileComponent implements OnInit{
   
     
    
  name : string ="";
  playlistNum : any;
  postNum : any; 
  friendsNum : any;
  location : string = "";
  textInput : FormControl = new FormControl('');
  posts : Post[] = [];
  friends : any[] = [];
  playlists : any[] = [];
  user? : User = undefined;
  acc? : Account = undefined;
  id : any;
  geo ? : MapGeocoderResponse = undefined;
  private routeSub?: Subscription;

  constructor(private router:Router, private m_service : MoodAPIService, private s_service : SpotifyApiService, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
      //call all functions to populate everything
      this.activatedRoute.params.subscribe(params => {
      console.log('params', params);
        // //get all accounts
      this.m_service.getAllUsers().subscribe((data) => {
      console.log(data); 
      this.user = data.find(u => u.user_Id === parseInt(params['user']))
      this.getAccountInfo(this.user?.user_Id);
      this.getPosts(this.user?.user_Id);
      this.getPlaylist(this.user?.user_Id);
      this.getFriends(this.user?.user_Id);
      })
    })
  }

  getAccountInfo(id : any){
    //request to get name or passed from login? 
    this.m_service.getAccount(id).subscribe(data => {
      console.log(data);
      this.acc = data;
      console.log(this.acc);
      this.name = this.acc.firstname + " " + this.acc.lastname;
      //this gets location by zipcode
      
      this.location = this.getLoc(this.acc.zipcode); //call location api to get location 
      this.id = this.acc.user_Id;
    });

  }

  getPosts(id : any) : any{
    //get all user posts
    this.m_service.getAllPosts(id).subscribe(data => {
      this.posts = data;
      console.log(data);
      console.log(this.posts);
      this.postNum = this.posts.length;
    })
  }

  getFriends(id : any){
    //get all user posts
    this.m_service.getAllFriends(id).subscribe(data => {
      this.friends = data;
      console.log(data);
      console.log(this.friends);
      this.friendsNum = this.friends.length;
    })
  }

  getPlaylist(id : any){
    //get all user posts
    this.m_service.getAllPlaylist(id).subscribe(data => {
      this.playlists = data;
      console.log(data);
      console.log(this.playlists);
      this.playlistNum = this.playlists.length;
    })
  }

  getLoc(zipcode : string) : any{
   // return this.m_service.getLocation(zipcode).subscribe(data => console.log(data));'
   this.m_service.getLocation(zipcode).subscribe( data2 => {
    this.geo = data2;
    this.location = this.geo.results[0].formatted_address;
    return this.location;
    })
  }

  //when user clicks edit profile
  editProfile(id : any){
    console.log(id);
    this.router.navigate(['/profilesettings', id]);
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}
