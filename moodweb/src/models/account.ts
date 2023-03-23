export interface Account{
    firstname: string,
    lastname: string,
    username: string;
    email: string, 
    password : any, 
    birthdate: Date | string
    phoneNumber : string, 
    zipcode : string, 
    
    /*
        acc.Firstname = info[0];
        acc.Lastname = info[1];
        acc.Username = info[2];
        acc.Email = info[3];
        acc.Password = info[4];
        acc.Birthdate = new DateTime(1969,10,31);
        //acc.Birthdate = DateTime.Parse(info[5]);
        acc.Zipcode = info[5];
        //acc.Zipcode = info[6];
    */
}

export interface User{
    user_Id : any, 
    f_Name: string,
    l_Name : string,
    phone_Number : string, 
    zipcode : string,
    birthdate: Date | string, 
}

export interface Post{

    content: string, 
    postId : any, 
    likes : any, 
    postDate : Date | string, 
    userID : any
}

export interface Comment{
    content: string,
    commentId: number,
    postId: number,
    likes: number,
    commentDate: string
}

export interface CommentData{
    name: string,
    content: string,
    commentId: number,
    postId: number,
    likes: number,
    commentDate: string
}

export interface Playlist{
    playlist_id: number,
    user_id: number,
    name: string,
    link: string
}