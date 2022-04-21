import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  leaders: Leader[];

  selectedLeader: Leader;

  onSelect(leader: Leader) {
    this.selectedLeader = leader;
  }

  constructor(private LeaderService: LeaderService) { }

  ngOnInit() {
    this.LeaderService.getLeaders().subscribe(leaders => this.leaders = leaders);
      //this.leaders = this.LeaderService.getLeaders();
  }

}
