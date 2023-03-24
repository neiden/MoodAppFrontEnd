import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoodAPIService } from '../mood-api.service';
import { SpotifyApiService } from '../spotify-api.service';
import { Account, User, Acc} from 'src/models/account';
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
  pass : any;
  zip : any;
  city : any;
  geo ? : MapGeocoderResponse = undefined;
  u_Id : any;
  

  constructor(private router:Router, private m_service : MoodAPIService, private activatedRoute: ActivatedRoute, private fBuilder:FormBuilder){}

  form : FormGroup = this.fBuilder.group({
    firstname : new FormControl(''),
    lastname : new FormControl(''),
    username : new FormControl(''),
    email : new FormControl(''),
    bdate : new FormControl(''),
    phonenum : new FormControl(''),
    zipcode : new FormControl(''),
    pwd : new FormControl(''),
  }) 


  ngOnInit(): any{
    
    this.activatedRoute.params.subscribe(params => {
    console.log('params', params)
    this.u_Id = parseInt(params['id'])
    console.log(this.u_Id);
  })

      this.m_service.getAccount(this.u_Id).subscribe(data => {
      console.log(data);
      this.acc = data; 
      console.log(this.acc)
      this.firstn = this.acc.firstname;
      this.lastn = this.acc.lastname;
      this.username = this.acc.username;
      this.email = this.acc.email;
      this.pass = this.acc.password;
      let formattedDate  = formatDate(this.acc.birthdate, 'MM/dd/yyyy', 'en-US')
      this.bdate = formattedDate;
      this.phonen = this.acc.phoneNumber;
      this.zip = this.acc.zipcode;
      this.city = this.getLoc(this.zip);
      this.u_Id = this.acc.user_Id;
    })

    return this.acc;
  }

  getAccount() : Account{
    return this.ngOnInit();
  }

  updateUser(e : Event){
      const accU = {} as Account;
      let newAcc = this.getAccount();
      console.log(this.form.value);

      let empty : Boolean = false;
      let count : number = 0;
      Object.keys(this.form.controls).forEach(key => {
        if(!this.form.controls[key].value){ 
          count = count + 1;
        }
      })
      if(count === 8){
        empty = true;
        console.log("empty");
        this.goToProfile(this.acc?.user_Id);
      }
      else {
         //checks if control input is empty
        Object.keys(this.form.controls).forEach(key => {
          if(this.form.controls[key].value){        
            if(this.form.controls[key] == this.form.controls['firstname']){
              newAcc.firstname = this.form.controls[key].value;
            }
            else if(this.form.controls[key] == this.form.controls['lastname']){
              newAcc.lastname = this.form.controls[key].value;
            }
            else if(this.form.controls[key] == this.form.controls['username']){
              newAcc.username = this.form.controls[key].value;
            }
            else if(this.form.controls[key] == this.form.controls['email']){
              newAcc.username = this.form.controls[key].value;
            }
            else if(this.form.controls[key] == this.form.controls['pwd']){
              newAcc.password = this.form.controls[key].value;
            } 
            else if(this.form.controls[key] == this.form.controls['bdate']){
              let formattedDate  = formatDate(this.form.controls['bdate'].value, 'MM/dd/yyyy', 'en-US')
              newAcc.username = formattedDate;
            }
            else if(this.form.controls[key] == this.form.controls['phonenum']){
              newAcc.phoneNumber = this.form.controls[key].value;
            } 
            else {
              newAcc.zipcode = this.form.controls[key].value;
            } 
        }
      })
      }

      console.log(newAcc.user_Id)

      this.m_service.updateUser(newAcc).subscribe(data => {
          console.log(data)
          //state changes were saved 
          //go to profile
          this.router.navigate(['/profile', newAcc.user_Id])
      });

     

      //test get all users
      this.m_service.getAllUsers().subscribe(data => console.log(data))

      //test get friends of user
      this.m_service.getAllFriends(this.acc?.user_Id).subscribe(data => console.log(data));
  }

  getLoc(zipcode : string) : any{
    // return this.m_service.getLocation(zipcode).subscribe(data => console.log(data));'
    this.m_service.getLocation(zipcode).subscribe( data2 => {
     this.geo = data2;
     this.city = this.geo.results[0].formatted_address;
     })
   }

   goToProfile(uid : any){
    this.router.navigate(['/profile', uid])
   }

}
