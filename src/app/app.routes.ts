import { Routes } from '@angular/router';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { UserPageComponent } from './user/pages/user-page/user-page.component';

export const routes: Routes = [
  {
    path:'home',
    component:HomePageComponent
  },
  {
    path:'user',
    component:UserPageComponent
  },
  {
    path:'**',
    redirectTo:'home'
  }
];
