import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {

  constructor( private activatedRoute: ActivatedRoute) {} 

  autheUser(){
    console.log('authenticate user')
  }
}
