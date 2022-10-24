import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pangolin } from '../pangolin';
import { PangolinService } from '../pangolin.service';

@Component({
  selector: 'app-pangolin-detail',
  templateUrl: './pangolin-detail.component.html',
  styleUrls: ['./pangolin-detail.component.css']
})
export class PangolinDetailComponent implements OnInit {
  pangolin: Pangolin;
  isProfilePage: boolean;
  userToken: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pangolinService: PangolinService,
    ) {}

  ngOnInit() {
    let token = localStorage.getItem("userToken");
    if(token) {
      this.userToken = JSON.parse(token)
    }
    this.isProfilePage = this.router.url.includes(this.userToken);
    const pangolinToken: string|null = this.route.snapshot.paramMap.get('token');
    if(pangolinToken) {
      this.pangolinService.getPangolinDetail(pangolinToken)
        .subscribe(pangolin => this.pangolin = pangolin)
    }
  };

  goToHomepage() {
    this.router.navigate(["/homepage"])
  };

  goToEditPangolin(pangolin: Pangolin) {
    this.router.navigate(["/edit-pangolin", pangolin.token])
  };
}
