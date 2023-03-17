import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MoodAPIService {
  

  apiRoot : string = "";

  mapiRoot : string = "https://moodapi.azurewebsites.net/Account";

  constructor(private http: HttpClient) { }

  loginUser(value: any)  {
    return this.http.post(this.apiRoot, "Sarah"); 
  }

  registerUser(value:any){
    return this.http.post(this.apiRoot, "Sarah");
  }

  getAllPosts() : Observable<string> {
    return this.http.get(this.apiRoot) as Observable<string>; 
  }


  getAllPlaylist() : Observable<string>  {
    return this.http.get(this.apiRoot) as Observable<string>; 
  }

  getMockAccount() : Observable<Array<string>>{
    return this.http.get(this.mapiRoot) as Observable<Array<string>>; 
  }

}
