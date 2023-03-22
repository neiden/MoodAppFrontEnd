import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  public url = 'https://localhost:4200/api/Posts';
  constructor(private http: HttpClient) { }

  public getAllPosts() {
    return this.http.get(this.url);
  }

  public getPost(){
    return this.http.get(this.url);
  }

  public getLikes(likes: number) {
    let endpoint = "/getLikes/" + likes;
    return this.http.get<number>(this.url + endpoint);
  }

}