import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { MoodAPIService } from '../mood-api.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  //need to get http request and change file names and such
  username : string = "";
  password : string = "";


  constructor(private router:Router, private fBuilder : FormBuilder, private service : MoodAPIService) {} 

  form : FormGroup = this.fBuilder.group({
    pwdInput : new FormControl(''),
    userInput : new FormControl('')
  })


  autheUser(){
    console.log('authenticate user')
    this.getInput();
  }

  goToRegister(){
    this.router.navigateByUrl('/register');
  }

  getInput() : void {
  }

  processForm(e: Event) : void{
   // this.service.loginUser(this.form.value).subscribe(data => console.log(data));
    this.form.markAllAsTouched();
    this.username = this.form.controls['userInput'].value; 
    this.password = this.form.controls['pwdInput'].value; 
    console.log(this.form.value);
    console.log(this.username);
    console.log(this.password);
  }
}
