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
  

  authenticate(){
    this.service.authenticate();
  }



  createPlaylist(){
    this.token = this.service.getToken();
    this.service.createPlaylist(this.mood.value, this.token);
  }

}
