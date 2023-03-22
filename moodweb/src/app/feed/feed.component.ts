import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { MoodAPIService } from '../mood-api.service';
import { ViewPostsComponent } from '../view-posts/view-posts.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent {
  
  constructor(private router:Router, private service: MoodAPIService) {}
  
  post1: PostData = {
    name: "John Swanberg",
    id: 2,
    imgSrc: "https://bootdey.com/img/Content/avatar/avatar6.png",
    content: "Today was a great today woweee",
    date: "3/20 11:32AM"

  }

  post2: PostData = {
    name: "Frank Zappa",
    id: 3,
    imgSrc: "https://bootdey.com/img/Content/avatar/avatar6.png",
    content: "I love music and I'm a little deranged :)",
    date: "3/21 8:14PM"
  }

  post3: PostData = {
    name: "Arya Stark",
    id: 4,
    imgSrc: "https://bootdey.com/img/Content/avatar/avatar6.png",
    content: "I shouldn't have been able to kill the Night King that was dumb.",
    date: "1/25 2:22AM"
  }


  Object : Object = Object;

  postList: PostData[] = [this.post1,this.post2,this.post3];





  users = ["John Swanberg", "Frank Zappa", "name"]

  NgOnInit(){
    //this.service.getAllPosts(user.userId).subscribe((data: any) => {
    //  posts = data['posts'];
    //}); 
  }

  goToProfile(){}

}

export interface PostData{
  name: string,
  id: number,
  imgSrc: string,
  content: string,
  date: string
}
