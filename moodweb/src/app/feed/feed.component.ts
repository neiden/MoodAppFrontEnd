import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { MoodAPIService } from '../mood-api.service';
import {FormControl, FormBuilder} from '@angular/forms';
import { ViewPostsComponent } from '../view-posts/view-posts.component';
import { Playlist, Post, User } from 'src/models/account';
import { SpotifyApiService } from '../spotify-api.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit{

  token: string = '';
  songArr: string[] = [];  
  songNames: string[] = [];
  songArtists: string[] = [];
  spotifyLink: string = '';
  spotifyPost: string = "";
  
  constructor(private router:Router, private service: MoodAPIService, private spotify_service: SpotifyApiService) {}

  postContent: FormControl = new FormControl('');
 
  post1: PostData = {
    name: "John Swanberg",
    id: 2,
    imgSrc: "https://bootdey.com/img/Content/avatar/avatar6.png",
    content: "Today was a great today woweee",
    date: "3/20 11:32AM",
    likes: 3
  }

  post2: PostData = {
    name: "Frank Zappa",
    id: 3,
    imgSrc: "https://bootdey.com/img/Content/avatar/avatar6.png",
    content: "I love music and I'm a little deranged :)",
    date: "3/21 8:14PM",
    likes: 1
  }
  
  post3: PostData = {
    name: "Arya Stark",
    id: 4,
    imgSrc: "https://bootdey.com/img/Content/avatar/avatar6.png",
    content: "I shouldn't have been able to kill the Night King that was dumb.",
    date: "1/25 2:22AM",
    likes: 5
  }


  Object : Object = Object;

  //postList: PostData[] = [this.post1,this.post2,this.post3];
  postList: PostData[] = [];
  userList: User[] = []






  users = ["John Swanberg", "Frank Zappa", "name"]

  ngOnInit(){
    //this.service.getAllPosts(user.userId).subscribe((data: any) => {
    //  posts = data['posts'];
    //}); 

    //this.getFeed();
    this.getUserFeed();
  }

  goToProfile(){}


  createPost(){
    const post = {} as Post;
    post.content = this.postContent.value;
    console.log(post.content);
    post.likes = 0;
    post.postDate = new Date();
    //cache'd user.id
    post.userID = 7
    this.service.createPost(post).subscribe((data: any) =>{
      console.log("this was created: " + data);
    });
  }

  getUserFeed(){
    //needs postList: PostData[] = [];
    var uid = 7;
    this.service.getUser(uid).subscribe((data: any) => {
      var name = data['firstname'] + data['lastname'];
      this.service.getAllPosts(uid).subscribe((data: any) => {
        for(var i = 0; i < data.length; i++){
          var post = {} as PostData;
          post.name = name;
          post.content = data[i]['content'];
          post.date = data[i]['postDate'];
          post.likes = data[i]['likes'];
          post.imgSrc = "https://bootdey.com/img/Content/avatar/avatar6.png";
          post.id = data[i]['postId'];
          this.postList.push(post);
        }
      })
    })

  }

  getFeed(){
    //get friends list
    //loop over every friend
    //  -postList = List<Post> 
    //  postList.add(getPosts(friend.id))
    //  
    var uId = 7;
    this.service.getAllFriends(uId).subscribe((data:any) => {
      console.log(data)
      for (var i = 0; i < data.length; i++){
        var friend = {} as User;
        var name = data[i]['f_Name'] + data[i]['l_Name'];
        friend.birthdate = data[i]['birthdate'];
        friend.f_Name = data[i]['f_name'];
        friend.l_Name = data[i]['l_name'];
        friend.phone_Number = data[i]['phone_number'];
        friend.user_Id = data[i]['user_Id'];
        friend.zipcode = data[i]['zipcode'];
        this.userList.push(friend);

        this.service.getAllPosts(data[i]['user_Id']).subscribe((data: any) => {
          for (var j = 0; j < data.length; j++){
            var post = {} as PostData;
            post.name = name;
            post.content = data[j]['content'];
            post.date = data[j]['postDate'];
            post.likes = data[j]['likes'];
            post.imgSrc = "https://bootdey.com/img/Content/avatar/avatar6.png";
            post.id = data[j]['postId'];
            this.postList.push(post);
           // console.log("This is a post by: " + name + data[j]['content']);
          }
        })
      }

    });


    
  }


  authenticate(){
    this.spotify_service.authenticate();
  }

  getGoogleScore(){
    // this.service.googleDemo().subscribe((data: any) =>{
    //   console.log(data);
    // });
    const uId = 7;
    var postContent = "";
    
    this.service.getAllPosts(uId).subscribe((data: any) => {
      for (var i = 0; i < data.length; i++){
        var dateStr = new Date(data[i]['postDate']);
        var today = new Date();
        if(dateStr.getDate() === today.getDate()){
          postContent += data[i]['content'] + " ";
        }
      }
      console.log("Posts being sent to google sentiment: "+ postContent);

      this.service.getGoogleScore(uId, postContent).subscribe((data: any) => {
        this.generatePlaylist(data['documentSentiment'].score);
      });
    });
  }


  generatePlaylist(score: any){
    var uId = 7;
    
    this.token = this.spotify_service.getToken();
    this.spotify_service.getTracks(score, this.token).subscribe((data: any) =>{
      console.log(data);
      const arr = data['tracks']['items'];
      for (var i = 0; i < arr.length; i++){
        console.log("Name of track: " + arr[i]['name'] + " uri of track: " + arr[i]['uri'])
        this.songArr.push(arr[i]['uri']);
        this.songNames.push(arr[i]['name']);
        this.songArtists.push(arr[i]['artists'][0]['name']);
        this.spotifyPost += `${i+1}.) ` + arr[i]['name'] + " by " + arr[i]['artists'][0]['name'] + "\n";
      }
      this.spotify_service.getUserId(this.token).subscribe((data2: any) => {
        this.spotify_service.createPlaylist(this.songArr, this.token, data2["id"]).subscribe((data3: any) => {4
          var link = data3['external_urls']['spotify'];
          this.spotifyPost += link;
          const post = {} as Post;
          //post.content = this.spotifyPost;
          post.content = this.spotifyPost;
          post.userID = uId;
          post.likes = 0;
          post.postDate = "",
          post.postId = 0;

          const playlist = {} as Playlist;
          playlist.link = link;
          playlist.name = "Mood Playlist " + formatDate(new Date(), 'MM/dd', 'en');
          playlist.playlist_id = 0;
          playlist.user_id = uId;
          //create playlist in db
          console.log(playlist);
          this.service.createPlaylist(playlist).subscribe((data: any) => {
            console.log("playlist created : " + playlist);
          });
          //create post in db
          console.log("post being sent to be created : " + post.content);
          this.service.createPost(post).subscribe((data: any) => {
            console.log("post Created: " + data);  
          });

          this.spotify_service.populatePlaylist(this.songArr, this.token, data3['id']).subscribe((data: any) => {
            console.log(this.postContent);
          })
        })
      })
    });
  }
}


export interface PostData{
  name: string,
  id: number,
  imgSrc: string,
  content: string,
  date: string,
  likes: number,
}
