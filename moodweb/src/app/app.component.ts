import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//export so other modules can import
export class AppComponent {
  //class variables
  title = 'moodweb';
  
  constructor(private router: Router){}
  //class functions

  ngOnInit() : void {
    //Commented out for now due to this command refreshing the link everytime the project is accessed
    // this was causing an issue with the code given from Spotify Authenticate getting overriden in the refresh
    // There's probably another way to set a starting route that doesn't refresh the urls
    //this.router.navigateByUrl('register');
    this.router.navigateByUrl('home');
  }

}
