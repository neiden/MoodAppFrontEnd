import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit{
  userPosts : any[] = [];

  ngOnInit(): void {
    //this.api.getUserPosts(UserID)
  }
}

