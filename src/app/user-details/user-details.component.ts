import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { UserData } from './user-details.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  formValue!:FormGroup
  userModelObj: UserData = new UserData;
  allUserData!: any;

  constructor(private formBuilder: FormBuilder, private api:ApiService) {

   }
  ngOnInit(): void {
    this.formValue = this.formBuilder.group(
      {
        name:[''],
        email:[''],
        mobile:[''],
        address:[''],
        services:[''],

      }
    )
    this.getAllData();
  }
  addUser(){
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.name;
    this.userModelObj.address = this.formValue.value.address;
    this.userModelObj.services = this.formValue.value.services;
    this.api.postUsers(this.userModelObj).subscribe(
      res=>{
        console.log(res);
        alert("User Added");
        this.formValue.reset();
        this.getAllData();
      },
      err=>{
        alert("failed")
      }
    )
  }

  getAllData(){
    this.api.getUsers().subscribe(res=>
      {
        this.allUserData = res;
      }
    )
  }

  deleteUser(data:any){
    this.api.deleteUsers(data.id).subscribe(
      res=>{
        alert("Deleted Successsfully");
        this.getAllData();
      }
    )
  }
  onEditUser(data:any){
    this.userModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  updateUser(){
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.name;
    this.userModelObj.address = this.formValue.value.address;
    this.userModelObj.services = this.formValue.value.services;
    
    this.api.updateUsers(this.userModelObj,this.userModelObj.id).subscribe(
      res=>{
        alert("User Updated successfully");
        let ref =document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
        this.getAllData();
      }
    )
  }
  
}
