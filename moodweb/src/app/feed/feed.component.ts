import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { MoodAPIService } from '../mood-api.service';
import {FormControl, FormBuilder} from '@angular/forms';
import { ViewPostsComponent } from '../view-posts/view-posts.component';
import { Playlist, Post, User, Mood } from 'src/models/account';
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
  mood: string = "No Mood created yet for today...";
  playlist: Playlist[] = [];

  u_Id : any;

  
  constructor(private router:Router, private service: MoodAPIService, private spotify_service: SpotifyApiService, private activatedRoute : ActivatedRoute) {}

  postContent: FormControl = new FormControl('');
 
  //postList: PostData[] = [this.post1,this.post2,this.post3];
  postList: PostData[] = [];
  userList: User[] = []





  users = ["John Swanberg", "Frank Zappa", "name"]


  ngOnInit(){
    //this.service.getAllPosts(user.userId).subscribe((data: any) => {
    //  posts = data['posts'];
    //}); 
    this.activatedRoute.params.subscribe(data => {
      this.u_Id = parseInt(data['id'])
    })

    this.service.getMoods(this.u_Id).subscribe((data: any) =>{
      console.log(data);
      for (var i = 0; i < data.length; i++){
        var dateStr = new Date(data[i]['date']);
        var today = new Date();
        console.log("Today:" + today);
        console.log("Date being Compared:" + dateStr);

        if(dateStr.getDate() === today.getDate()){
          this.mood = "Today you're feeling... " + data[i]["category"] + " with a score of " + data[i]["score"] + "!!";
          break;
        }

      }
    });

    this.service.getAllPlaylist(this.u_Id).subscribe((data: any) =>{
      console.log(data);
      for (var i = 0; i < data.length; i++){
        var p = {} as Playlist;
        p.link = data[i]['spotifyLink'];
        p.name = data[i]['name'];
        p.playlist_id = 0;
        p.user_id = 0;
        this.playlist.push(p);
      }
    });



    this.getUserFeed(this.u_Id);
    this.getFeed();
  }

  goToProfile(){}


  createPost(){
    const post = {} as Post;
    post.content = this.postContent.value;
    console.log(post.content);
    post.likes = 0;
    post.postDate = new Date();
    //cache'd user.id
    post.userID = this.u_Id;
    this.service.createPost(post).subscribe((data: any) =>{
      console.log("this was created: " + data);
      location.reload();
    });
  }

  getUserFeed(id : any){
    //needs postList: PostData[] = [];
    var uid = id;
    this.service.getUser(uid).subscribe((data: any) => {
      var name = data['firstname'] + " " + data['lastname'];
      this.service.getAllPosts(uid).subscribe((data: any) => {
        for(var i = 0; i < data.length; i++){
          var post = {} as PostData;
          post.name = name;
          post.content = data[i]['content'];
          post.date = formatDate(new Date(data[i]['postDate']), 'MM/dd HH:mm', 'en');
          post.likes = data[i]['likes'];
          post.imgSrc = "https://bootdey.com/img/Content/avatar/avatar6.png";
          post.id = data[i]['postId'];
          post.userId = this.u_Id;
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
    var uId = this.u_Id;
    this.service.getAllFriends(uId).subscribe((data:any) => {
      console.log(data)
      for (var i = 0; i < data.length; i++){
        var friend = {} as User;
        let name = data[i]['f_Name'] + " " + data[i]['l_Name'];
        friend.birthdate = data[i]['birthdate'];
        friend.f_Name = data[i]['f_name'];
        friend.l_Name = data[i]['l_name'];
        friend.phone_Number = data[i]['phone_number'];
        friend.user_Id = data[i]['user_Id'];
        friend.zipcode = data[i]['zipcode'];
        this.userList.push(friend);

        this.service.getAllPosts(friend.user_Id).subscribe((data2: any) => {
          if(data2 != null){
            for (var j = 0; j < data2.length; j++){
              var post = {} as PostData;
              post.name = name;
              post.content = data2[j]['content'];
              post.date = data2[j]['postDate'];
              post.likes = data2[j]['likes'];
              post.imgSrc = "https://bootdey.com/img/Content/avatar/avatar6.png";
              post.id = data2[j]['postId'];
              post.userId = friend.user_Id;
              this.postList.push(post);
              console.log("This is a post by: " + name + data2[j]['content']);
            }
          }
        })
      }

    });


    
  }


  authenticate(){
    this.spotify_service.authenticate(this.u_Id);
  }

  createMood(score: number){
    var genre: string = "";
    var category: string = "";
    if (score >= .6){
      genre = "rap";
      category = "Ecstatic";
    }
    else if(score < 0){
      genre = "ballad";
      category = "Emotionally Damaged";
    }
    else{
      genre = "Cool Jazz";
      category = "Laid Back";
    }
    var mood = {} as Mood;
    mood.category = category;
    mood.userId = this.u_Id;
    mood.date = new Date();
    mood.score = score;
    this.service.createMood(mood).subscribe((data :any) => {
      console.log("Mood was successfully created" + data);
    });
  }

  getGoogleScore(){
    // this.service.googleDemo().subscribe((data: any) =>{
    //   console.log(data);
    // });
    const uId = this.u_Id;
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
        var score = data['documentSentiment'].score;
        this.createMood(score);
        this.generatePlaylist(score);
      });
    });
  }


  generatePlaylist(score: any){
    var uId = this.u_Id;
    
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
            location.reload();
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
  userId: number
}
