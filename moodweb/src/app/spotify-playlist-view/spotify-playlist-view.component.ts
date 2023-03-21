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

  mood: FormControl = new FormControl('');
  token: string = '';
  songArr: string[] = [];  
  songNames: string[] = [];
  songArtists: string[] = [];
  spotifyLink: string = '';
  

  authenticate(){
    this.service.authenticate();
  }



  createPlaylist(){
    
    this.token = this.service.getToken();
    this.service.getTracks(this.mood.value, this.token).subscribe((data: any) =>{
      console.log(data);
      const arr = data['tracks']['items'];
      for (var i = 0; i < arr.length; i++){
        console.log("Name of track: " + arr[i]['name'] + " uri of track: " + arr[i]['uri'])
        this.songArr.push(arr[i]['uri']);
        this.songNames.push(arr[i]['name']);
        this.songArtists.push(arr[i]['artists'][0]['name']);
      }
      this.service.getUserId(this.token).subscribe((data2: any) => {
        this.service.createPlaylist(this.songArr, this.token, data2["id"]).subscribe((data3: any) => {
          this.spotifyLink = data3['external_urls']['spotify'];
          this.service.populatePlaylist(this.songArr, this.token, data3['id']).subscribe((data: any) => {
            console.log("Songs: " + this.songNames + " Song artists: " + this.songArtists + "Spotify link: " + this.spotifyLink);
          })
        })
      })
      //this.service.createPlaylist(this.songArr, this.token);
    });
  }


}
