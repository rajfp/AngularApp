import { Component, OnInit } from '@angular/core';
import { MovieListService } from '../movie-list.service';
import { MovieDetails } from '../movie-details';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { UserDetails } from '../user-details';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
   mov={
     "id":"5",
    "name":"Dhamaal",
    "rating":"3"
  }
  public movies=[]
  public errorMsg
  public username
  userDetails:UserDetails
  fav:any=[]
  obj={}

  constructor(private movieListService:MovieListService,private route:ActivatedRoute,private router:Router) {
    this.userDetails= new UserDetails
   }
  ngOnInit() {
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      let name =params.get('username');
      this.username = name;
      this.movieListService.getMoviesList()
      .subscribe(data => {this.movies = data,
        console.log(data);
        // for(let i=0;i<this.movies.length;i++)
        // console.log(this.movies[i].title);
        
        
              error => this.errorMsg = error});
      this.movieListService.getUserFavouriteList(this.username).subscribe(data=>{
        this.userDetails=data
        // console.log("favlist=>",this.userDetails.favourites);
        // console.log("favlist=>",data);
        this.fav=this.userDetails.favourites
        // console.log(this.fav);
        
        
      })        
      
              
  })
}

Addfavourites(title,overview){
  console.log("Its working",title);
  this.obj={
      "name":title,
      "rating":"4",
      "overview":overview
  }
  this.fav.push(this.obj)
  console.log(this.fav);
  this.userDetails.favourites=this.fav
  this.movieListService.addToFavouriteList(this.userDetails.username,this.userDetails).subscribe(data=>{
  })
}
logout(){
this.router.navigate(["/signup"])
}
}
