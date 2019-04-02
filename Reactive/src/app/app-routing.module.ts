import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SignupComponent } from './signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:"",redirectTo:"signup", pathMatch:"full"},
//  {path:"movielist" ,component:MovieListComponent},
  {path:"signup" ,component:SignupComponent},
  {
    path:"movielist/:username",component:MovieListComponent   
  },
  {path:"**",component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
