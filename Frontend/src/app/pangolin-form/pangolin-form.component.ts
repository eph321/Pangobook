import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Pangolin } from '../pangolin';
import { PangolinService } from '../pangolin.service';

@Component({
  selector: 'app-pangolin-form',
  templateUrl: './pangolin-form.component.html',
  styleUrls: ['./pangolin-form.component.css']
})
export class PangolinFormComponent implements OnInit {
  @Input() pangolin: Pangolin;
  types: string[];
  roles: string[];
  isSignupForm: boolean;
  message: string|null;

  constructor(
    private pangolinService: PangolinService,
    private router: Router,
    private authService: AuthService,
    ) {}

  ngOnInit() {
    this.types = this.pangolinService.getPangolinTypeList()
    this.roles = this.pangolinService.getPangolinRolesList()
    this.isSignupForm = this.router.url.includes("signup")
    this.pangolin.password = ""
  };

  hasType(type: string): boolean {
    return this.pangolin.types.includes(type);
  };

  hasRole(role: string): boolean {
    return this.pangolin.roles.includes(role);
  };

  selectType($event: Event, type: string) {
    const isChecked = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.pangolin.types.push(type);
    } else {
      const index = this.pangolin.types.indexOf(type);
      this.pangolin.types.splice(index, 1)
    }
  };

  selectRole($event: Event, role: string) {
    const isChecked = ($event.target as HTMLInputElement).checked;
    if(isChecked) {
      this.pangolin.roles.push(role);
    } else {
      const index = this.pangolin.roles.indexOf(role);
      this.pangolin.roles.splice(index, 1)
    }
  };
 
  isTypesValid(type: string): boolean {
    if (this.pangolin.types.length === 1 && this.hasType(type)) {
      return false;
    }
    if (this.pangolin.types.length > 2 && !this.hasType(type)) {
      return false;
    }
    return true
  };

  isRolesValid(role: string): boolean {
    if (this.pangolin.roles.length === 1 && this.hasRole(role)) {
      return false;
    }
     if (this.pangolin.roles.length === 2 && !this.hasRole(role)) {
      return false;
    }
    return true
  };

  onSubmit() {
   if (this.isSignupForm) {
      this.pangolinService.addPangolin(this.pangolin)
        .subscribe((response) => {
          if(response.result !== false) {
            this.authService.isLoggedIn = true;
            localStorage.setItem("userToken", JSON.stringify(response));
            this.router.navigate(["/homepage"]);
          } else {
            this.message = response.error;
          }
        });
    } else { 
      this.pangolinService.updatePangolin(this.pangolin)
        .subscribe(() => this.router.navigate(["/pangolin", this.pangolin.token]));
   } 
  };

  goBackBtn() {
    if(this.isSignupForm) {
      this.router.navigate(["/login"])
    };
    this.router.navigate(["/homepage"])
  };

}
