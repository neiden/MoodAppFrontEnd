import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  constructor() { }

  authenticate(){
    
  }

  createPlaylist(mood: string){
    console.log(mood);
    if(mood == "Happy"){
      //API call to create happy playlist
    }
  }
}
