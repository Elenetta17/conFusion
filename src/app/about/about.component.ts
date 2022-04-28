import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';



import { flyInOut } from '../animations/app.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  selectedLeader: Leader;
  errMess: string;


  onSelect(leader: Leader) {
    this.selectedLeader = leader;
  }

  constructor(private LeaderService: LeaderService, @Inject('BaseURL') private BaseURL: string) { }

  ngOnInit() {
    this.LeaderService.getLeaders().subscribe(leaders => this.leaders = leaders, errmess => this.errMess = errmess);
      //this.leaders = this.LeaderService.getLeaders();
  }

}
