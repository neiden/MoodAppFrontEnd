import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Account } from 'src/models/account';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SentimentAPIService {
  
  url : string = "https://language.googleapis.com/v1/documents:analyzeSentiment?key=";
  API_KEY : string = "AIzaSyD63ZgTdXHj305f6vRPq61-H7JG_N0XHpc";
  text : string = "I am sad"

  constructor(private http:HttpClient) {}
  
  getSentiment(){ 
  }

}
