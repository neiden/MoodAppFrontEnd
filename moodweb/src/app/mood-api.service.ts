import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Account, User, Post, Playlist} from 'src/models/account';
import { MapGeocoderResponse} from 'src/models/geocoder-response.model'

@Injectable({
  providedIn: 'root'
})

export class MoodAPIService {
  
  googlemapapiurl : string = "https://maps.googleapis.com/maps/api/geocode/json?address="
  googleApiKeyMap : string ="&key=AIzaSyBEco-ddCVFeGzdwv54Xt-vNyfHCq5jBL0";
  mapiRoot : string = "https://moodapiapp.azurewebsites.net/Account";

  apiRoot : string = "https://moodapiapp.azurewebsites.net";


  constructor(private http: HttpClient) { }

  parsePosts(uId: number){
    var posts = [{}]
    var postContent: string = '';
    this.getAllPosts(uId).subscribe((data: any) => {
      for (var i = 0; i < data.length; i++){
        var dateStr = new Date(data[i]['postDate']);
        var today = new Date();
        console.log(dateStr.getDate() + " compared to " + today.getDate());
        if(dateStr.getDate() === today.getDate()){
          postContent += data[i]['content'] + " ";
        }
      }
    });
  }


  getGoogleScore(uId: number, postContent: string): Observable<any>{
    const apikey : string= "AIzaSyCfJR1Q9fqCqDHqy80cLnpBYUyP2s3WSuc";
    //Only lasts for one hour!!!
    const token: string= "ya29.c.b0Aaekm1Ic0eaPptKS3aAp-DiM2ogVOqMawQLnwf66QHpDBK6h5_m5OH4vaBBLgqKh4xvGcC53jIR3DlxdzuLPzH8fw_-r2exi7xudsU0c8g5KjIekBGV_cUAX7eVQBwAVQcW2A8lyvwSXRguvVbhF39eKbhSudmY829d2OyBC5ju-2dguw8U1EvfFUGROr3qzlUBFtWEDE8Jw_CttKXzl1qjnGct8Dy17THaT4DIn87NfHs7ST6VRHps-8UnviApoDhanhDOsfvJO2cHq-xvsWIxAQ_LL0vYXOdmpgHX6fz2XPerwh06MSwwPfUjZBrYUDTMEt0S1pZIE340KOgrrSkh1kJ2dR4Y793lFRgXjFaw57qcrnv-BuFeb42ta0m1sRR_koY2tip1i0f2_M-ckzF59ZttfjzkyXr0avuQQ_m-FX1QQrp4jswrio6pneJB8fFYIQUzluiI649W-Q6bV610MU2w2n6Sz8abz24jMotJ03F0hyQj796-s9eQs67xQQupRo9w0X6-jM0k1MIYZkm8c0Fwfp4m5MJblen1MpjW-5Wuc9MU4heIgeI9pkf6f9QqM48U03crXs08qmsq0f2zFRvwhh_4JkFrZ1mUQQ2BolyVQjVmg8kmtr4xO8w59OFvMUQ9dzcYfW-8Jvc3ZSa0e2alleotVbi-plguop8qxk88rzk2Ycd-_0mml30-jxRp8zyYpI2Ik0mVQj-s3O7yn9OYk0U7F1Z4wIt-412eXalFk0hx2xfQWVs6iB7Yh5XM27xSRfvw4ha224kVaX0u9crhpx7BimoUXX1RkivQiu1evRo1a7Ua8totpp5aeu_xOSgpUF3jsyd3h71fFqqq48wrbgVpFvkp3I5W0x6rmap01ckj2bgu498gR3Otfk0BvfjipQ2l65UWYQjn0YUYkVZem4YW3i3stZkq7suUuawBUn5wchYnROfzWdqicJFyQ9iri1ek8l99t9imVjF0WkSXjntVdMM-eZSImicOUSM_4hdl2lJ5";
    const url: string = "https://language.googleapis.com/v1/documents:analyzeSentiment";
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`
    }
    const data = {
      'encodingType': 'UTF8',
      'document': {
        'type': 'PLAIN_TEXT',
        'content': postContent
      }
    }
    
    return this.http.post(url, data, {headers: headers})
  }

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

  createPlaylist(playlist: Playlist) : Observable<any> {
    const url = this.apiRoot + "/Playlist/Playlists";
    const body = {
      "playlistId": 0,
      "userId": playlist.user_id,
      "name": playlist.name,
      "spotifyLink": playlist.link
    }
    const headers = {'Content-Type' : 'application/json', 'accept' : 'text/plain'};
    return this.http.post(url, body, {headers: headers});
  }

  //The Date is in a different timezone than PST
  createPost(post: Post) : Observable<any> {
    const headers = {'accept' : 'text/plain'
      ,'Content-Type': 'application/json'}
    const body = {
      "content": post.content,
      "postId": 0,
      "likes": 0,
      "postDate" : new Date(),
      "userID" : post.userID
    }
    return this.http.post("https://moodapiapp.azurewebsites.net/Post/Posts", body, {headers: headers});
  }


}
