# READ ME


THIS IS CODE FOR THE ABOUT US. 
INSERT ABOUT ME ON REPLIT
https://replit.com/join/ihnliyktuo-gibsonchan


## Project Overview:
	A social media website where users can post their thoughts and feelings and a Spotify playlist will be generated based on the sentiment analysis of those messages. 


## MVP Goals:
- As a user, I can create/log in to an account 
- As a user, I can view friends’ accounts 
- As a user, I can view profile page
- As a user, I can modify my information through settings
- As a user, I can view my playlists
- As a user, I can comment and react to my friends posts
- As a user, I can listen to my playlists by being redirected to Spotify app
- The program should be able to pull an existing Spotify playlist using the Spotify API based on the user’s mood analysis result.
- The program should be able to analyze the user’s feelings through posts using Google Sentiment API.
- The program should be able to analyze the users zipcode to return a city and state using Google Geocoder API.

## Design
Figma Prototype 
https://www.figma.com/file/kICwVagQkihXb9h4ThocfJ/MoodApp?node-id=13%3A24&t=RQuiwNTEt7EOLxZg-1

## Stretch Goals: 
Users/friends can delete posts/reactions.
The program will generate an embedded Spotify player for each playlist created
Users can follow friends and view their playlists 
The program should be able to create a Spotify playlist using Spotify API based on the user’s mood analysis result.
The program will generate a mood based on the music a user has been listening to lately
The user can customize their profile page/feed
Users can stream music together while sharing posts.
User’s feed can be customized based on song that is playing 


## API List
Spotify API  
https://developer.spotify.com/documentation/web-api/
Google API:
https://cloud.google.com/natural-language/docs/analyzing-sentiment
https://developers.google.com/apps-script/samples/automations/feedback-sentiment-analysis
https://cloud.google.com/natural-language/docs/

## Database (Azure DB):
Server=tcp:230206net-p2-server.database.windows.net,1433;Initial Catalog=TeamC;Persist Security Info=False;User ID=teamC;Password={temp};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;

Must use: Database 

Entities and their attributes: 
User Entity -> ID(PK), F_name, L_name,  phone_number, picture, account_date, birthdate, zip_code
Login Entity -> Login_ID(PK), Username (FK User.ID), email,  password
Post Entity -> Post_ID(PK), postdate, post_text, Poster_ID(FK User.ID), num_likes
Comment Entity -> Comment_ID(PK), comment_date, content, Username (FK User.ID)
Friend Entity  -> Friend_ID(PK),  source_ID (FK User.ID), target_ID(FK User.ID)
Playlist Entity -> Playlist_ID (PK), name, UID (FK User.ID),  link_text
Song Enity -> Song_ID (PK), Playlist_Parent(FK Playlist_ID), Title, Artist, Album, Genre

Description of Database:
ER Diagram:



https://app.diagrams.net/#G1pQLoIBH1SrpqeFRC_Y6poe2gs5ZrbOay

## Activity Flow
https://app.diagrams.net/#G1FaeeJw1iTylyTBG1vbX30S9IPLUodl-Q
Activity flow diagrams will be done by person in charge of feature for each feature
Unit Testing
50% project coverage
Unit testing will be implemented as each feature is implemented 

## Coding Convention 
Front End Coding Convention 
https://github.com/cxpartners/coding-standards
JS Coding Convention
https://google.github.io/styleguide/jsguide.html
SQL Coding Convention
https://www.ibm.com/docs/en/opw/8.2.0?topic=guide-sql-coding-guidelines
C# Coding Convention
https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions
	
	
 	
## Kanban Board 
Trello Kanban Board
https://trello.com/b/pAAZI8ko/p2-mood

## Git Process (merge/code review practice/branch protection)
Feature based branching strategy 
Each feature will be broken down to smaller tasks 
We will meet and review merge requests before accepting them
All prior functionalities should still pass tests and work as defined in the project requirements (MVP)
Any changes that affect code other branches depend on should be discussed prior
Everyone should pull to bring their branch up to date
The project should build before merging feature 
Have small commits to ensure uncommitting will not have a great code undo 
We will not commit half-done work 
We will follow the practices described on the following articles: 
Git best practices for commit
Git best practices for branching and merging
