import { AfterViewInit, Component, OnInit } from '@angular/core';
declare const M: any;
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { PangolinService } from '../pangolin.service';
import { Pangolin } from '../pangolin';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewInit {

  auth: AuthService;
  pangolinsList: Pangolin[];
  userToken: string;
  pangolin: Pangolin;
  friendList: Pangolin[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private pangolinService: PangolinService,
    ) {}

  ngOnInit() {
    this.auth = this.authService;
    let token: string|null = localStorage.getItem("userToken");
    if(token){
      this.userToken = JSON.parse(token);
    };
    this.pangolinService.getPangolinDetail(this.userToken)
      .subscribe((pangolin) => this.pangolin = pangolin);

    this.pangolinService.getPangolinsList(this.userToken)
      .subscribe((pangolinsList) => this.pangolinsList = pangolinsList);

    this.pangolinService.getFriendList(this.userToken)
      .subscribe((friendList) => this.friendList = friendList);
  }

  ngAfterViewInit(): void {
    setTimeout( function() {
      const options = {
        edge: 'right',
     };
      const elem = document.getElementById('profil');
      const instance = M.Sidenav.init(elem, options)
    }, 0); 
    setTimeout( function() {
      const options = {
        edge: 'right',
     };
      const elem = document.getElementById('friend-list');
      const instance = M.Sidenav.init(elem, options)
    }, 0)
  };

  goToPangolin(pangolinToken: string) {
    this.router.navigate(["/pangolin", pangolinToken])
  };

  goToEditPangolin(pangolinToken: string) {
    this.router.navigate(["/edit-pangolin", pangolinToken])
  };

  addFriendFromList(friendToken: string) {
    this.pangolinService.addFriendFromList({currentPangolin: this.pangolin.token, friendToken: friendToken})
      .subscribe((response) => {
        if(response) {
          this.friendList = response;
          M.toast({html: 'Ami ajouté !'});
        } else {
          M.toast({html: 'Ami déjà présent dans votre liste !'})
        }
      })
  };
  
  deleteFriend(friendToken: string) {
    this.pangolinService.deleteFriend({currentPangolin: this.pangolin.token, friendToken: friendToken})
      .subscribe((response) => {
        if(response) {
          this.friendList = response;
          M.toast({html: 'Supprimé de vos amis !'});
        }
      })
  };

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"])
  };

}
