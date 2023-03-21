import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MoodAPIService } from '../mood-api.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent {

  //vars for possible future use and testing
  fname : string = ""
  lname : string = ""
  email : string = ""
  password : string = ""

  //dep injection of router
  constructor(private router: Router, private fBuilder : FormBuilder, private service : MoodAPIService){}

  //form group that will hold form controls from html input 
  form : FormGroup = this.fBuilder.group({
    firstname : new FormControl(''),
    lastname : new FormControl(''),
    username : new FormControl(''),
    email : new FormControl(''),
    password: new FormControl(''),
    birthdate : new FormControl(''),
    phoneNumber : new FormControl(''),
    zipcode : new FormControl('')
  })

  //authenticate input? 
  autheInput() : void {}

  //funciton create account 
  registerAccount(e: Event) : void {
    this.service.registerUser(this.form.value).subscribe(data => console.log(data));
    this.form.markAllAsTouched();
   // this.fname= this.form.controls['fNameInput'].value; 
   // this.lname= this.form.controls['lNameInput'].value; 
   // this.email= this.form.controls['emailInput'].value; 
   // this.password = this.form.controls['pwdInput'].value; 
    //console.log(this.form.value);
    //console.log(this.fname);
    //console.log(this.lname);
    //console.log(this.email);
    //console.log(this.password);
  }


  //go to login page
  gotoLogin() {
    this.router.navigateByUrl('/login');
  }
}
