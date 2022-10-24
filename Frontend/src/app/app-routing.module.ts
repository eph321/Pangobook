import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth.guard';
import { PangolinDetailComponent } from './pangolin-detail/pangolin-detail.component';
import { SignupComponent } from './signup/signup.component';
import { EditPangolinComponent } from './edit-pangolin/edit-pangolin.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent},
  { path: "homepage", component: HomepageComponent, canActivate: [AuthGuard] },
  { path: "pangolin/:token", component: PangolinDetailComponent, canActivate: [AuthGuard] },
  { path: "edit-pangolin/:token", component: EditPangolinComponent, canActivate: [AuthGuard] },
  { path: "**", component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
