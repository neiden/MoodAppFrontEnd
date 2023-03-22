import { Component,Input, OnInit } from '@angular/core';
import { PostData } from '../feed/feed.component';


@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit{
  @Input()
  postData!: PostData;

  
  userPosts : any[] = [];

  ngOnInit(): void {
    //this.api.getUserPosts(UserID)
  }
}

