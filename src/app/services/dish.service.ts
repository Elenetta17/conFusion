import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})


export class DishService {

  getDishes(): Promise<Dish[]> {
    //return Promise.resolve(DISHES);
    return new Promise(resolve => {
      setTimeout(()=>resolve(DISHES), 2000);
    });
  }

  getDish(id: string): Promise<Dish> {
     return new Promise(resolve => {
      setTimeout(()=>resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    //return DISHES.filter((dish)=>(dish.id ===id))[0];
    //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  });
}
  getFeaturedDish(): Promise<Dish> {
     return new Promise(resolve => {
      setTimeout(()=>resolve(DISHES.filter((dish)=>(dish.featured))[0]), 2000);
    //return DISHES.filter((dish)=>(dish.featured))[0];
    //return Promise.resolve(DISHES.filter((dish)=>(dish.featured))[0]);
  });

}
 
  constructor() { }
}
