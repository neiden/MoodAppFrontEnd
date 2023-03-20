import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buffer } from 'buffer';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  constructor(private _http: HttpClient) { }

  scope : string = 'user-read-private user-read-email playlist-modify-public';
  clientId : string = '0c8985046bc0483ebc4b6192fffa648d';
  clientSecret: string = 'bc3019aa224d49dcad001b9fd074d886';
  redirectURI : string = 'http://localhost:4200/home'



  authenticate() : void{
    

    // this._http.get("https://accounts.spotify.com/authorize/",{
    //   params: {
    //     scope: scope,
    //     client_id: clientId,
    //     redirect_uri: redirectURI,
    //     response_type: 'code',
    //     show_dialog: 'true'
    //   },
    //   headers: {
    //     'Access-Control-Allow-Origin':'*'
    //   }
    // }).subscribe((data: any) => {
    //   console.log(data.value);
    // });

    var url = "https://accounts.spotify.com/authorize/?scope=user-read-private%20user-read-email%20playlist-modify-public&client_id=0c8985046bc0483ebc4b6192fffa648d&redirect_uri=http://localhost:4200/home&response_type=token&show_dialog=true";


    window.location.href = url;
  }


  getCode() : any{
    var code : any;
    const queryString = window.location.search;
    console.log(queryString);
    if(queryString.length > 0){
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get('code')
    }
    console.log("THIS IS THE CODE IN THE URL " + code);
    this.getAccessToken(code);
  }

  getToken() : any{
    var token : any;
    var url = window.location.href;
    token = url.substring(url.indexOf("#")+14, url.indexOf("&"));
    console.log("user access token: " + token);
    return token;
  }


  //'Authorization': 'Basic ' + (Buffer.from(this.clientId + ":" + this.clientSecret).toString('base64')),
  //MGM4OTg1MDQ2YmMwNDgzZWJjNGI2MTkyZmZmYTY0OGQ6YmMzMDE5YWEyMjRkNDlkY2FkMDAxYjlmZDA3NGQ4ODY=

  getAccessToken(code: string){
    // this._http.post("https://accounts.spotify.com/api/token", {
    //   form: {
    //     code: code, 
    //     redirect_uri: this.redirectURI,
    //     grant_type: 'authorization_code'
    // },
    //  headers: {
    //   'Authorization': 'Basic MGM4OTg1MDQ2YmMwNDgzZWJjNGI2MTkyZmZmYTY0OGQ6YmMzMDE5YWEyMjRkNDlkY2FkMDAxYjlmZDA3NGQ4ODY='
    // },
    // json: true
    
    // }).subscribe((data: any) => {
    //   console.log(data.value);
    // })


    const url = "https://accounts.spotify.com/api/token";
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic MGM4OTg1MDQ2YmMwNDgzZWJjNGI2MTkyZmZmYTY0OGQ6YmMzMDE5YWEyMjRkNDlkY2FkMDAxYjlmZDA3NGQ4ODY=')
      .set('Content-Type', 'application/x-www-form-urlencoded')

    let requestBody = new FormData();
    requestBody.append('code', code);
    requestBody.append('redirect_uri', this.redirectURI);
    requestBody.append('grant_type', 'authorization_code');
    this._http.post(url, requestBody, { headers : headers}).subscribe((data : any) => {
      console.log(data.value);
    })
  }

  // getAccessToken(code: any){
  //   let body = "grant_type=authorization_code";
  //   body += "&code";
  //   body += "&redirect_uri=http://localhost:4200/home";
  //   body += "&client_id=0c8985046bc0483ebc4b6192fffa648d";
  //   body += "&client_secret=bc3019aa224d49dcad001b9fd074d886";
  //   this.postAuthorizationCode(body);
  // }

  // postAuthorizationCode(body : any){
  //   let xhr = new XMLHttpRequest()
  //   xhr.open("POST", "https://accounts.spotify.com/api/token", true);
  //   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  //   xhr.setRequestHeader('Authorization', 'Basic ' + Buffer.from(this.clientId + ":" + this.clientSecret).toString('base64'));
  //   xhr.send(body);
  //   xhr.onload = this.getAuthorizationResponse();
  // }


  createPlaylist(mood: string){
    console.log(mood);
    if(mood == "Happy"){
      //API call to create happy playlist
    }
  }
}