import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {throwError as observableThrowError, Observable } from 'rxjs';
import { MovieDetails } from './movie-details';
import { tap, catchError } from 'rxjs/operators';
import { UserDetails } from './user-details';


@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  constructor(private http:HttpClient) { 

  }
  private _url: string = "http://localhost:3000/movieList";
  data:Observable<UserDetails>
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  getMoviesList(): Observable<MovieDetails[]>{
    return this.http.get<MovieDetails[]>("http://localhost:4204/results")
                    .pipe(tap(data =>data) , catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }
  addMovie(movie:MovieDetails):Observable<any>{
    return this.http.post<any>("http://localhost:3000/movieList",movie,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe
    (catchError(this.errorHandler))
  
  }
  registerUser(userDetails:any):Observable<any>{
    return this.http.post<any>("http://localhost:4202/user",userDetails,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe
    (catchError(this.errorHandler))
  
  }
  getUserFavouriteList(username:string): Observable<UserDetails>{
    return this.http.get<UserDetails>("http://localhost:4202/user/"+username)
                    .pipe(tap(data =>data) , catchError(this.errorHandler))
  }
  errorHandle(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }
 
   getUserDetails(userDetails:string):Observable<UserDetails>{
    
    console.log("http://localhost:4202/user/"+ userDetails);
    return  this.http.get<UserDetails>("http://localhost:4202/user/"+ userDetails)
    .pipe(tap(data =>data) , catchError(this.errorHandler))                 
  
  }
  addToFavouriteList(username:string,updatedDetails:any):Observable<any>{
    return this.http.put<any>("http://localhost:4202/user/"+username,updatedDetails,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe
    (catchError(this.errorHandler))
  }
}
