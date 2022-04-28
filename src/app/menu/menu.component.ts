import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


import { flyInOut } from '../animations/app.animations';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})



export class MenuComponent implements OnInit {
  dishes: Dish[];

  errMess: string


  constructor(private dishService: DishService, @Inject('BaseURL') private BaseURL: string) { }

  ngOnInit() {
      //this.dishService.getDishes().then(dishes => this.dishes = dishes);
      this.dishService.getDishes().subscribe(dishes => this.dishes = dishes, errmess => this.errMess = <any>errmess)
  }

}
