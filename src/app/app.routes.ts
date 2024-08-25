import { Routes } from '@angular/router';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { UserPageComponent } from './user/pages/user-page/user-page.component';
import { isLogedGuard } from './guards/is-loged.guard';

export const routes: Routes = [
  {
    path:'home',
    component:HomePageComponent
  },
  {
    path:'user',
    component:UserPageComponent,
    canActivate: [isLogedGuard]
  },
  {
    path:'**',
    redirectTo:'home'
  }
];
