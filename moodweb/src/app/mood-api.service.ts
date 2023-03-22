import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Account, User, Post} from 'src/models/account';
import { MapGeocoderResponse} from 'src/models/geocoder-response.model'

@Injectable({
  providedIn: 'root'
})

export class MoodAPIService {
  
  googlemapapiurl : string = "https://maps.googleapis.com/maps/api/geocode/json?address="
  googleApiKeyMap : string ="&key=AIzaSyBEco-ddCVFeGzdwv54Xt-vNyfHCq5jBL0";
  mapiRoot : string = "https://moodapi.azurewebsites.net/Account";

  apiRoot : string = "https://moodapiv2.azurewebsites.net";


  constructor(private http: HttpClient) { }

  loginUser(usern : string, pwd : string)  {
    let arr : string [] = [usern, pwd];
    let geturl = this.apiRoot + "/User/Login?info=" + arr[0] + "&info=" + arr[1];
    return this.http.get(geturl) as Observable<User>;
  }

  registerUser(acc : Account){
    acc.username = "VelmaJinkies1";
    acc.zipcode = "123456";
    let posturl = this.apiRoot + "/User/Users?info=" + acc.firstname + "&info=" + acc.lastname + "&info=" + acc.username + "&info=" + acc.email + "&info=" + acc.password + "&info=" + acc.zipcode;
    return this.http.post(posturl, acc);
  }

  getAccount( id : any): Observable<Account>{
    let url = this.apiRoot + "/User/Users?User_Id=" + id;
    return this.http.get(url) as Observable<Account>;
  }

  getAllUsers() : Observable<Array<User>>{
    return this.http.get(this.apiRoot) as Observable<Array<User>>;
  }

  getAllPosts( id : any) : Observable<Array<Post>> {
    let url = this.apiRoot + "/Post/Posts?uId=" + id;
    return this.http.get(url) as Observable<Array<Post>>; 
  }


  getAllPlaylist( id : any) : Observable<Array<string>>  {
    let url = this.apiRoot + "/Playlist/Playlists?uId=" + id;
    let purl = "https://moodapiv2.azurewebsites.net/Playlist/Playlists?uId=1";
    return this.http.get(url) as Observable<Array<string>>; 
  }

  getAllFriends( id : any) : Observable<Array<string>>{
    
    return this.http.get(this.apiRoot) as Observable<Array<string>>; 
  }

  getMockAccount() : Observable<Array<any>>{
    return this.http.get(this.mapiRoot) as Observable<Array<any>>; 
    
  }

  getLocation(zipcode : string) : Observable<MapGeocoderResponse> {
    let geoapi = this.googlemapapiurl + zipcode + this.googleApiKeyMap;
    return this.http.get(geoapi) as Observable<MapGeocoderResponse>
  }

}
