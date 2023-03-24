import { Component,Input, OnInit } from '@angular/core';
import { PostData } from '../feed/feed.component';
import { MoodAPIService } from '../mood-api.service';
import { CommentData } from 'src/models/account';
import { formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit{
  @Input()
  postData!: PostData;

  constructor(private service: MoodAPIService, private route: Router){}

  commentList: CommentData[] = [];
  userPosts : any[] = [];
  commentContent: FormControl = new FormControl('');

  ngOnInit(): void {
    //this.api.getUserPosts(UserID)
    //this.getComments();
    this.getComments();
  }

  createComment(){

    this.service.getUser(this.postData.userId).subscribe((data: any)=>{
      const comment = {} as CommentData;
      comment.content = this.commentContent.value;
      comment.likes = 0;
      comment.commentDate = new Date();
      comment.commentId = 0;
      comment.postId = this.postData.id;
      comment.u_id = this.postData.userId;
      comment.name = data['f_Name'] + " " + data['l_Name'];
      this.service.createComment(comment).subscribe((data: any) => {
        console.log("comment was created!!!" ); 
        //this.route.navigate(['/home/' , comment.u_id]);
        //location.reload();
        
      })
    });
  }

  getComments(){
      this.service.getComments(this.postData.id).subscribe((data : any) => {
        if(data != null){
          for (var i = 0; i < data.length; i++){
            let com = {} as CommentData;
            com.commentDate = formatDate(new Date(data[i]['commentDate']), 'MM/dd HH:mm', 'en');
            com.commentId = data[i]['commentId'];
            com.postId = data[i]['postId'];
            com.likes = data[i]['likes'];
            com.content = data[i]['content'];
            com.u_id = data[i]['u_id'];
            com.name = "Anonymous User"; //default name if user is deleted
  
  
            this.service.getUser(com.u_id).subscribe((data2: any) => {
              if(data2 != null){
                com.name = data2['firstname'] + " " + data2['lastname'];
                this.commentList.push(com);

              }
             })
          }

        }
      });
  }
}

