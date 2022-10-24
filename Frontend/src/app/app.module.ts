import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth.guard';
import { PangolinDetailComponent } from './pangolin-detail/pangolin-detail.component';
import { PangolinFormComponent } from './pangolin-form/pangolin-form.component';
import { EditPangolinComponent } from './edit-pangolin/edit-pangolin.component';
import { SignupComponent } from './signup/signup.component';
import { RoleColorPipe } from './role-color.pipe';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    PangolinDetailComponent,
    PangolinFormComponent,
    EditPangolinComponent,
    SignupComponent,
    RoleColorPipe,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
