import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  message: string = "";
  email: string;
  password: string;
  auth: AuthService;

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.auth = this.authService
  };
  
  setMessage() {
    if(this.auth.isLoggedIn){
      this.message = "Vous êtes connnecté."
    } else {
      this.message = "Identifiant ou mot de passe incorrect."
    }
  };

  login() {
    this.message = "Tentative de connexion en cours ...";
    this.auth.login(this.email, this.password)
      .subscribe((isLoggedIn: boolean|string) => {
        this.setMessage();
        if(isLoggedIn){
          this.router.navigate(["/homepage"])
        } else {
          this.password = "";
          this.router.navigate(["/login"])
        }
      }) 
  };

  signup() {
    this.router.navigate(["/signup"])
  };

}
