import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { SpotifyApiService } from '../spotify-api.service';


@Component({
  selector: 'app-spotify-playlist-view',
  templateUrl: './spotify-playlist-view.component.html',
  styleUrls: ['./spotify-playlist-view.component.css']
})
export class SpotifyPlaylistViewComponent {

  constructor(private formBuilder: FormBuilder, private service: SpotifyApiService){}

  score: FormControl = new FormControl('');
  token: string = '';
  songArr: string[] = [];  
  songNames: string[] = [];
  songArtists: string[] = [];
  spotifyLink: string = '';
  postContent : string = "";


  // authenticate(){
  //   this.service.authenticate();
  // }

  delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getDelayedPostContent(){  
    await this.delay(7000);
    return this.postContent;
  }



  generatePlaylist(){
    
    this.token = this.service.getToken();
    this.service.getTracks(this.score.value, this.token).subscribe((data: any) =>{
      console.log(data);
      const arr = data['tracks']['items'];
      for (var i = 0; i < arr.length; i++){
        console.log("Name of track: " + arr[i]['name'] + " uri of track: " + arr[i]['uri'])
        this.songArr.push(arr[i]['uri']);
        this.songNames.push(arr[i]['name']);
        this.songArtists.push(arr[i]['artists'][0]['name']);
        this.postContent += `${i+1}.) ` + arr[i]['name'] + " by " + arr[i]['artists'][0]['name'] + "\n";

      }
      this.service.getUserId(this.token).subscribe((data2: any) => {
        this.service.createPlaylist(this.songArr, this.token, data2["id"]).subscribe((data3: any) => {
          //this.spotifyLink = data3['external_urls']['spotify'];
          this.postContent += data3['external_urls']['spotify'];
          //this.service.CreatePost(user_id, postContent)
          this.service.populatePlaylist(this.songArr, this.token, data3['id']).subscribe((data: any) => {
            //console.log("Songs: " + this.songNames + " Song artists: " + this.songArtists + "Spotify link: " + this.spotifyLink);
            console.log(this.postContent);
          })
        })
      })
      //this.service.createPlaylist(this.songArr, this.token);
    });
  }



}
