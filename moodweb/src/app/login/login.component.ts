import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { MoodAPIService } from '../mood-api.service';
import { Account, User } from 'src/models/account';

@Component({
  selector: 'app-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //need to get http request and change file names and such
  username : string = "";
  password : string = "";
  acc? : Account = undefined;
  user? : User = undefined;


  constructor(private router:Router, private fBuilder : FormBuilder, private service : MoodAPIService) {} 

  form : FormGroup = this.fBuilder.group({
    pwdInput : new FormControl(''),
    userInput : new FormControl('')
  })


  autheUser(){
    console.log('authenticate user')
  }

  goToRegister(){
    this.router.navigateByUrl('/register');
  }

  loginUser(){
    //Design Option:
    //Have a separate UserDataService that holds a user object.
    //Before navigating to Home component, populate this.user_data_service.user = authenticate(loginInfo)
    //Then in Home component, the NgOnInit() can query the data service and retrieve the user object. 
    //this.router.navigateByUrl('/home');
    this.username = this.form.controls['userInput'].value; 
    this.password = this.form.controls['pwdInput'].value; 
    let arr : string [] = [this.username,this.password];
    //To Do: account cache 
    // for now navigate to home page
    this.form.markAllAsTouched();
    this.service.loginUser(this.username,this.password).subscribe(data => {
      console.log(data);
      //this.acc = data;
      this.user = data;
      if(this.user.user_Id){
        console.log(this.user.user_Id);
        //this.router.navigate(['/home', this.user.user_Id]);
        this.router.navigate(['/profile', this.user.user_Id]);
      }
    });
    

  }

  processForm(e: Event) : void{
  }

}
