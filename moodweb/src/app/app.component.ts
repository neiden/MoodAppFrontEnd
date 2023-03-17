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
    this.router.navigateByUrl('register');
  }

}
