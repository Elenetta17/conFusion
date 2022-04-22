import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';

import {DishService} from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { switchMap } from 'rxjs/operators';

import {Comment} from '../shared/comment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

  @Input()
  dish: Dish;

  dishIds: string[];
  prev: string;
  next: string;

  constructor(private dishservice: DishService, private route: ActivatedRoute, private location: Location, private fc: FormBuilder) { 
    this.createcommentForm();
  }

  @ViewChild('commentform') commentFormDirective: NgForm;

  commentForm: FormGroup;
  commentInput: Comment;

  formErrors : any ={
    'author': '',
    'comment': ''
  }
  validationMessages: any = {
    'author': {
        'required': 'Name is required',
        'minLength': 'Name must be at least 2 characters long'
    },
    'comment':  {
        'required': 'Comment is required',
    }
  }



  ngOnInit(): void {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }


createcommentForm() {
    this.commentForm = this.fc.group({
      rating: '5',
      comment: ['', Validators.required],
      author: ['', Validators.required, Validators.minLength(2)],
      date: Date.now(),
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

   onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.commentInput = this.commentForm.value;
    console.log(this.commentInput);
    this.commentForm.reset({
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    ontacttype: 'None',
    message: ''
    });
    this.commentFormDirective.resetForm();
  }


setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
}

    goBack(): void {
        this.location.back();
    }

}

/*{
                rating: 5,
                comment: 'Imagine all the eatables, living in conFusion!',
                author: 'John Lemon',
                date: '2012-10-16T17:57:28.556094Z'
            },*/

