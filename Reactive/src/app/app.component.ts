import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from './password.validator';
import { Router } from '@angular/router';
import { MovieListService } from './movie-list.service';
import { UserDetails } from './user-details';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private fb:FormBuilder,private router:Router,private movieService:MovieListService){
    this.userDetail=new UserDetails
  }

  user={}
  errorMsg
  userDetail:UserDetails;
  serDetails={}
  favourites=[{
    "name": "Golmaal",
    "rating": "4"}]
  registrationForm=this.fb.group({
    userName:['',[Validators.required,Validators.minLength(5)]],
    password:[''],
    confirmPassword:[''],
  },{validator:PasswordValidator})
  
  get userName() {
    return this.registrationForm.get('userName');
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }
   getMovies(){
    this.router.navigate(["/movielist"])
  }
  registerUser(){
    this.user={
      "id":this.userName.value,
      "username":this.userName.value,
      "password":this.confirmPassword.value,
      "favourites":this.favourites
    }
    console.log(this.userName.value);
    console.log(this.confirmPassword.value);
    console.log(this.user);
    
    this.movieService.registerUser(this.user).subscribe((data:any)=>{
      console.log(data);
    },(err:any)=>{
  console.log(err);
  
    })      
  }
  loginUser(){
    this.movieService.getUserDetails(this.userName.value).subscribe(data=>{
      this.userDetail= data
      console.log(data.id);
      console.log(data);
      console.log(data.favourites);
      console.log("UserDetail=>",this.userDetail);
      if(this.userDetail.password!==this.confirmPassword.value)
      console.log("Wrong password");
      else
      {
      console.log("Correct Password");
      this.router.navigate(["/movielist"])
      }
    })    
}
}
