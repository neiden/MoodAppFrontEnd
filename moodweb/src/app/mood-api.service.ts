import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, ObservedValueOf } from 'rxjs';
import { Account, User, Post, Playlist, Comment, Acc, CommentData, Mood} from 'src/models/account';
import { MapGeocoderResponse} from 'src/models/geocoder-response.model'

@Injectable({
  providedIn: 'root'
})

export class MoodAPIService {
  
  googlemapapiurl : string = "https://maps.googleapis.com/maps/api/geocode/json?address="
  googleApiKeyMap : string ="&key=AIzaSyBEco-ddCVFeGzdwv54Xt-vNyfHCq5jBL0";
 //mapiRoot : string = "https://moodapiapp.azurewebsites.net/Account";

 // apiRoot : string = "https://moodapiapp.azurewebsites.net";
  apiRoot : string = "https://moodapiapp2.azurewebsites.net"

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
    const token: string= "ya29.c.b0Aaekm1Lct_CAt2B8a7P43i84YIoAw1wzrxGUn5QsuVCSxMrKQimdoLphaudeEuPOkRnhW5Zb-ciO7MN5awRzhp-yefbdVAhJ7B_uaDVAug5I8IKV1PHh7qEioUYb8xbFbOC3DhNvcD1HOcBRFkLnda91jZahvOQ_wUcMRzOUDmESyowmPjj4d5UaBTfSC1lNWOCFhCO5PyDIkHns7bkxK1jHR8gSvYCdqWSzWCSDWwtkG8w6Yip5BP7zApumD6elB3Tr3B4mG34EwBZKkOaS0VS53OCm3PYJTaPgNqUia_Z2BZqCmFxrR-ht9GKX1yr0SbLm3chMsgL339PaQ6dMsrqedoZYixjxMRvlU7Uvy3sjM639jrQ_8SYqOFzVrIijRnZ8c2ZOtp6_Utsjo2-lWRBzgasvI3dlu0otvztqO8IRXf0lYXb6M0x9yVzrpSigO-OmtM8rQrgsoQlvBdY-3hp-IpSs7Jmm2hWouVFevz1Q_ZJOJklj5vSlR8bebuS7SmbZjWQWxRMmrB7jI9_yQScv2nXwc04gnWs6b9f3RUY2cstWznX8ZwZwio2QiJnim0rUuvn_wpJh9am24y6qQ-fux5xfxh6Setg83MwuJv8qeaf6kQWlt74yv2MIg9tljIFdfzYddy6n6szjFu6ct6W5jj-Y76tXinfBIS4dX175ir8gUVslz6hFvdexIR9Z47z96bkRlJgmVyVMnFdJu4Ionzk2jn1o4kxM4i3eR0IpxycZnW_SW2vVY3ykUUoo21_myatQi0J0Oc0osyZsnWjVc_MkBstVe908fZW8tBvvyRUkl7umFFooyq1m2gu9ozXQhyV_oVlmqjWyX3tBlYQ9luk3x_WoSZ62ymlvWrWI5xnehuna8z6_Mny64pb6Zr2as34aVM6iqxditsWe5shvVp5_RVgIWW-7fi27_-ea7IBQcJyIBjF2wnn6WFx8Ouoo5tYi8lkfbmRFk-2Ypzay5rfglB3qsoy4i0sJsob9iRcpvnctgJi";
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

  registerUser(acc : Account) : Observable<any>{
    let posturl = this.apiRoot + "/User/Users?info=" + acc.firstname + "&info=" + acc.lastname + "&info=" + acc.username + "&info=" + acc.email + "&info=" + acc.password + "&info=" + acc.birthdate + "&info=" + acc.zipcode + "&info=" + acc.phoneNumber;
    return this.http.post(posturl, acc) as Observable<any>;
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
    //http://localhost:5169/User/Users?up=Shaggyyyyy&up=Rogers&up=ScoobySnacks31&up=mysterysnack%40scooby.com&up=newPass1&up=1969-10-31&up=92657&up=209654874&up=5
    let url = this.apiRoot + "/User/Users?up=" 
    let endpoint2 = acc.firstname + "&up=" + acc.lastname + "&up=" + acc.username + "&up=" + acc.email + "&up=" + acc.password + "&up=" + acc.birthdate + "&up=" + acc.zipcode + "&up=" + acc.phoneNumber + "&up=" + String(acc.user_Id);
    return this.http.put(url+endpoint2,acc);
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


  getLocation(zipcode : string) : Observable<MapGeocoderResponse> {
    let geoapi = this.googlemapapiurl + zipcode + this.googleApiKeyMap;
    return this.http.get(geoapi) as Observable<MapGeocoderResponse>
  }

  getComments(p_Id: number) : Observable<Array<Comment>>{
    return this.http.get(this.apiRoot + "/Comment/Comments?pId=" + p_Id) as Observable<Array<Comment>>;
  }

  getMoods(uId: number) : Observable<Array<Mood>>{
    return this.http.get(this.apiRoot + "/Mood/Moods?uId=" + uId) as Observable<Array<Mood>>;
  }

  createComment(comment: CommentData) : Observable<Comment> {
    const url = this.apiRoot + "/Comment/Comments";
    const body = {
      "content" : comment.content,
      "commentId": 0,
      "postId": comment.postId,
      "likes": comment.likes,
      "u_id": comment.u_id,
      "commentDate": new Date()
    }
    const headers = {
      'Content-Type' : 'application/json', 'accept' : 'text/plain'
    };

    return this.http.post(url, body, {headers: headers}) as Observable<Comment>;
  }

  createMood(mood: Mood) : Observable<Mood> {
    const url = this.apiRoot + "/Mood/Moods";
    const body = {
      "moodId" : 0,
      "userId" : mood.userId,
      "date": mood.date,
      "category": mood.category,
      "score": mood.score
    }
    const headers = {
      'Content-Type' : 'application/json', 'accept' : 'text/plain'
    }
    return this.http.post(url, body, {headers: headers}) as Observable<Mood>;
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
