import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  //need to get http request and change file names and such
  username : string = "";
  password : string = "";
  constructor(private router:Router, private activatedRoute: ActivatedRoute) {} 

  autheUser(){
    console.log('authenticate user')
  }

  goToRegister(){
    this.router.navigateByUrl('/register');
  }
}
