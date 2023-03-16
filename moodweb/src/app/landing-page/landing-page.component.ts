import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent {

  //dep injection of router
  constructor(private router: Router){}

  //funciton create account 
  registerAccount(e: Event) : void {
    console.log(e)
  }

  //go to login page
  gotoLogin() {
    this.router.navigateByUrl('/login');
  }
}
