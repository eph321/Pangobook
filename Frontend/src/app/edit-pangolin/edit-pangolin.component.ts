import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pangolin } from '../pangolin';
import { PangolinService } from '../pangolin.service';

@Component({
  selector: 'app-edit-pangolin',
  templateUrl: './edit-pangolin.component.html',
  styleUrls: ['./edit-pangolin.component.css']
})
export class EditPangolinComponent implements OnInit {
  pangolin: Pangolin|undefined;

  constructor(
    private route: ActivatedRoute,
    private pangolinService: PangolinService,
  ) { }

  ngOnInit() {
    const pangolinToken: string|null = this.route.snapshot.paramMap.get("token");
    if(pangolinToken) {
      this.pangolinService.getPangolinDetail(pangolinToken)
        .subscribe(pangolin => this.pangolin = pangolin);
    } else {
      this.pangolin = undefined;
    }
  }

}
