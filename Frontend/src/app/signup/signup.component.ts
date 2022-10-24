import { Component, OnInit } from '@angular/core';
import { Pangolin } from '../pangolin';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 pangolin: Pangolin;

  ngOnInit() {
    this.pangolin = new Pangolin();
  }

}
