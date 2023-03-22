import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Account } from 'src/models/account';
import { Post } from 'src/models/post';


@Injectable({
  providedIn: 'root'
})

export class MoodAPIService {

  apiRoot : string = "https://moodapiv2.azurewebsites.net/User/GetAccount?User_Id=";

  mapiRoot : string = "https://moodapi.azurewebsites.net/Account";

  constructor(private http: HttpClient) { }

  loginUser(arr : string[])  {
    let geturl = "https://moodapiv2.azurewebsites.net/User/Login?info=" + arr[0] + "&info=" + arr[1];
    return this.http.get(geturl) as Observable<Account>;
  }

  registerUser(acc : Account){
    acc.username = "VelmaJinkies1";
    acc.zipcode = "123456";
    console.log(acc);
    //https://moodapiv2.azurewebsites.net/User/Users?info=Daphne&info=Blake&info=DaccoutBlake1&info=jeepers%40scooby.com&info=369852%21S&info=54652
    let posturl = "https://moodapiv2.azurewebsites.net/User/Users?info=" + acc.firstname + "&info=" + acc.lastname + "&info=" + acc.username + "&info=" + acc.email + "&info=" + acc.password + "&info=" + acc.zipcode;
    return this.http.post(posturl, acc);
  }

  createPost(postData: any): Observable<any> {
    const post: Post = {
      post_id: postData.post_id,
      u_id: postData.u_id,
      likes: postData.likes,
      content: postData.content,
      post_date: postData.post_date
    };
    
    let posturl = "https://moodapiv2.azurewebsites.net/create_post";
    return this.http.post<Post>(posturl, post);
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
