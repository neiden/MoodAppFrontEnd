import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoodAPIService } from '../mood-api.service';
import { SpotifyApiService } from '../spotify-api.service';
import { Account, User} from 'src/models/account';
import { formatDate } from '@angular/common';
import { MapGeocoderResponse} from 'src/models/geocoder-response.model'

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
  city : any;
  geo ? : MapGeocoderResponse = undefined;
  

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
      this.city = this.getLoc(this.zip);
    })
  }

  updateUser(e: Event){
      console.log(this.form.value);
      if(!this.form.controls['firstname'].value){
        console.log("this is empty")
      }

      //checks if control input is empty
      Object.keys(this.form.controls).forEach(key => {
        console.log(key);
        if(!this.form.controls[key].value){
          console.log(key + "this is empty")
        }
      })

      for (const field in this.form.controls) { // 'field' is a string

        const control = this.form.get(field); // 'control' is a FormControl  
      
      }
  }

  getLoc(zipcode : string) : any{
    // return this.m_service.getLocation(zipcode).subscribe(data => console.log(data));'
    this.m_service.getLocation(zipcode).subscribe( data2 => {
     this.geo = data2;
     this.city = this.geo.results[0].formatted_address;
     })
   }

   goToProfile(){
    this.router.navigateByUrl('profile/${10}')
   }

}
