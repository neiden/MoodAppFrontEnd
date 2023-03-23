import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoodAPIService } from '../mood-api.service';
import { SpotifyApiService } from '../spotify-api.service';
import { Account, User} from 'src/models/account';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {

  acc? : Account = undefined;
  firstn : string = "";
  lastn : string = "";
  username : string = "";
  email : string = "";
  bdate : any;
  phonen : any;
  zip : any;

  

  constructor(private router:Router, private m_service : MoodAPIService, private activatedRoute: ActivatedRoute, private fBuilder:FormBuilder){}

  form : FormGroup = this.fBuilder.group({
    firstname : new FormControl(''),
    lastname : new FormControl(''),
    username : new FormControl(''),
    email : new FormControl(''),
    bdate : new FormControl(''),
    phonenum : new FormControl(''),
    zipcode : new FormControl('')
  }) 


  ngOnInit(): void {
    this.m_service.getAccount(10).subscribe(data => {
      this.acc = data; 
      this.firstn = this.acc.firstname;
      this.lastn = this.acc.lastname;
      this.username = this.acc.username;
      this.email = this.acc.email;
      let formattedDate  = formatDate(this.acc.birthdate, 'MM/dd/yyyy', 'en-US')
      this.bdate = formattedDate;
      this.phonen = this.acc.phoneNumber;
      this.zip = this.acc.zipcode;
    })
  }

  updateUser(e: Event){

  }
}
