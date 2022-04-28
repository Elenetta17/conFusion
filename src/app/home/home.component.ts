import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader} from '../shared/leader';
import { LeaderService } from '../services/leader.service';


import { flyInOut } from '../animations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrmess : string; 
  promoErrmess : string; 
  leaderErrmess : string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService, private leaderservice: LeaderService, @Inject('BaseURL') private BaseURL: string) { }

  ngOnInit(): void {
    //this.dish = this.dishservice.getFeaturedDish();
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish, errmess => this.dishErrmess = <any>errmess);
    //this.promotion = this.promotionservice.getFeaturedPromotion();
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion, errmess => this.promoErrmess = <any>errmess );
    //this.leader = this.leaderservice.getFeaturedLeader();
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader  = leader, errmess => this.leaderErrmess = <any>errmess );
  }

}
