import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MoodAPIService {
  

  apiRoot : string = "https://moodapiv2.azurewebsites.net/User/GetAccount?User_Id=";

  mapiRoot : string = "https://moodapi.azurewebsites.net/Account";

  constructor(private http: HttpClient) { }

  loginUser( arr : string[])  {
    let geturl = "https://moodapiv2.azurewebsites.net/User/Login?info=" + arr[0] + "&info=" + arr[1];
    return this.http.get(geturl) as Observable<Array<string>>;
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
