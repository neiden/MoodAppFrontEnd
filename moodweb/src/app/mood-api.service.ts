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
    const token: string= "ya29.c.b0Aaekm1K5X0a99TSTizILoZnYL2qMaWae_JBImM51suzImeBO_BOG-ZRV1GouniDke5w4l3gFZbZMp0vwVLpPiUX795Yu37j3tpgS0jljX-Xk3hXblL58aF_r2wtHx8wwuLu7YFE85yoHCyzpR6wzph1edHIlhqu0LMtBrcBJyBkHr-v3JN1mxtMnyeYo-lgj0THgaWRTrsrzJsdYDse6REHbbU9Gdhg3d3umC5yNwuLPFW6FAvqgWgqtKaSVV03IaYUcQ5Qgv2ivBw8NuLWrCf_8W1JOK_o5ZJCPpwxFDntkA6bLNFV90L1j0LefYQUF9jxEZJLqG337K0cORv3fi-6hbfixB7ubnnU3Vo1jip5U_Wqyv5hJXUmt5ou2wno93nFZ68vQSfW9ZBhlq9avj-2kZa03bMmriVi8dalIJZ2_sQdjieY_9hyOB41obZec1yvXzBcn78w8_mWqX_B-M6dxxaltpzSsUjdV9--XjbRcfg2ScqRy4MMo55uwvvXmpkS6ts2mIX0VJif4xBB23ZO5Zoqvola96s0xB8yi9iUfQqUsIBWqo1lwessRFOaj54iq2lbtiaq98O9IUjqd2FyIXU_XMhQ6SS5FcXXfyb-Io5deuzdqp1MsMZobluFzY4Ol1F9QnOS1Q0v-Xj9RbWFyuRfw2Wz0xYlgy9kwui6StdbjRUjU5VRoxhgrvxIfpU1BM4RUnvFW5gi2W8rJmspxO8Yc0f-ssXYb-hSrRjdrVparu0V0XxR2VIzJ-I5fO3dbzxqrYh6repuFQ16XQBj1_OtRxS74gWsadXJj1oJl9g2mszfVIwbRjnbjgwzwvimoY4y7qhefSnQsoSpwudygvoWe05Y1XykgxlwM5dyZ4X2QVsdpoy0bqqiX4QnWF5h6eRy9-f9c2UltqBxp1i-RggU2iVnvoxklO5t8_upIb15Swr8e1YwoQZsZOsFyxF9bBbj0vcuRb1d95yjw7Y0u9kJqMt86pg7oS7BVgsdhujrW3R_fgrI";
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
