import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent {
  //funciton create account 
  registerAccount(e: Event) : void {
    console.log(e)
  }
}
