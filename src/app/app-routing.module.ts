import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';
import { MapGuard } from './guard/map.guard';
import { RegistrationGuard } from './guard/registration.guard';
import { DashboardGuard } from './guard/dashboard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'intro', component: AppIntroComponent },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  // { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'map', loadChildren: './pages/map/map.module#MapPageModule', 
  canActivate: [MapGuard]
 },
  {
    path: 'registration', loadChildren: './pages/registration/registration.module#RegistrationPageModule',
    canActivate: [RegistrationGuard]
  },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule',
  canActivate: [DashboardGuard]

},
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'review', loadChildren: './pages/review/review.module#ReviewPageModule' },
  { path: 'booking', loadChildren: './pages/booking/booking.module#BookingPageModule' },
  // { path: 'restaurant', loadChildren: './pages/restaurant/restaurant.module#RestaurantPageModule' },
  { path: 'invitation', loadChildren: './pages/invitation-list/invitation-list.module#InvitationListPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
