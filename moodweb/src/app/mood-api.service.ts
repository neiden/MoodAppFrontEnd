import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

import { Account, User, Post, Acc, Playlist} from 'src/models/account';

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
    const token: string= "ya29.c.b0Aaekm1KHEi5D5ZnUppEenE_skNvtqFbunhIhyDogk3aFsv2aL6Skj36yUHSwXz_AtJZGpMZdRYNA67Zgq0S5GSP2JJ4yh1RI64opJ39IJQCuHXekh4eDIz6kJuvPCIs5RAaVVIKR-vUyiaKPWjQWoS0lydDQWjSrNqWBxynmZWjNsP5Qw3ISWR72LaQO9rwi2jD-mRUPNczsUHmXqLht_5X3wpT5zx-4QX7FYAFiWtZL5hSic9an9ktHAe_DRZh3nvgVNx56uATr-cMG-DQHt0pk2iCziaGjLLlnEp5lQj8ylNcIjZ1x3-ZeF9NTOsZj-ncjq78JL337Alb7y_Fncs6sk0-8WR9YSZXgZu41wt__sQqa_XhjS7JRhadI_IYOe9sWRFOxxQZhkqalQVt6ml_ziOUty2yQVJXBdl1cskROFqzrB_SYo9F5BhOJOUixkz38BpbcW8ckZstSzgkMYy7gwb2p9d5I8xIto31UYlZzv1BFkS96hxjBz6vV6enmy_xhM3WuFUY5sIr0f0l5rzmF2cth9VOSRoa5md71ZOedo4dZY_SmR68isnWuwbQ0tOazUi-O10q2ZZ1vkZyfjzn46dYZroUVSY4MxwevImsydmk_9wW9bbjR4nuMSy8JmRsi-1yd-muuOVlQ9i_4xUff4on8jcyx39RMQ_60v7F2zBxj7IkejXmh7w7QnlqQxsi2h3QeswaZf_l_7YvR7Vu5u7d14I9s0zkIMmjrYIZo_l9JgJXs0xgpffRlhR-lgfBXsJ-fy545O5l83Madoi2Jf0_Jco_MXcOyMJc0Mhf_1Y7a8y59pwbY5BFWp-oYSkVY4hl0QcJ5px1RW51J11YUOsMtBorQkXQFmhFvcodFZax-pR1titRwZylZaFbOq8hzl9xi7lkwhrhptgyd3U4lS3-Ix8wIasnQxSSkw4x6_XUZfB7pfmVMaMOk-BQVicQxpYqf8R3j8WIfevMz763jbeqQR7ou_S-v4yoVy3Q12IpQIdrIp38";
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
    let url = this.apiRoot + "/User/AllUsers";
    return this.http.get(url) as Observable<Array<User>>;
  }

  updateUser( acc : Acc) : Observable<any>{
    let temp = "http://localhost:5005/User/Users"
    const url = this.apiRoot + "/Users/Users"
    // const headers = {'accept' : 'text/plain' ,'Content-Type': 'application/json'}
    // const body = {
    //   "username": acc.username,
    //   "password": acc.password,
    //   "email": acc.email,
    //   "user_Id": acc.user_Id,
    //   "firstname": acc.firstname,
    //   "lastname": acc.lastname,
    //   "phoneNumber": acc.phoneNumber,
    //   "zipcode": acc.zipcode,
    //   "birthdate": acc.birthdate
    // }
    // return this.http.put(temp, body, {headers: headers});
    return this.http.put(temp,acc);
  }

  getUser(uId: number): Observable<User>{
    return this.http.get(this.apiRoot + "/User/Users?User_Id=" + uId) as Observable<User>;
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

  getAllFriends( id : any) : Observable<Array<User>>{
    return this.http.get(this.apiRoot + "/Friend/Friends?uId=" + id) as Observable<Array<User>>; 

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
