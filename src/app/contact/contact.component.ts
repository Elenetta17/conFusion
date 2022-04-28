import { Component, OnInit, ViewChild, Inject} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {Feedback, ContactType } from '../shared/feedback';
import {FeedbackService} from '../services/feedback.service';

import { NgForm } from '@angular/forms';

import { flyInOut, visibility, expand } from '../animations/app.animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective: NgForm;

  feedbackForm: FormGroup;
  feedback: Feedback; 
  contactType = ContactType;
  feedbackscopy : Feedback[];
  feedbacks: Feedback[];
  errMess : string;
  feedbackerrMess: string;
  formvisibility = 'shown';
  spinnervisibility = 'hidden';
  submissionvisibility = 'hidden';



   formErrors: any = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages: any = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder, private feedbackservice: FeedbackService, @Inject('BaseURL') private BaseURL: string) {
    this.createForm();
    
  }

  ngOnInit(): void {
    
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data))

    this.onValueChanged
  }

  onValueChanged(data?: any){
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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


  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.spinnervisibility = "shown";
    this.formvisibility = "hidden"; 
    this.submissionvisibility = "hidden"
    this.feedbackservice.postFeedback(this.feedback)
                         .subscribe(feedback=>{
                          this.feedback=feedback; this.submissionvisibility = "shown";  this.spinnervisibility = "hidden";                        
                         },
                         errmess =>this.feedbackerrMess = <any>errmess)
    setTimeout(()=>{this.submissionvisibility = "hidden"; this.formvisibility='shown'; this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:'',
      email:'',
      agree:false,
      contacttype:'None',
      message:''
    });
    this.feedbackFormDirective.resetForm();


  }  , 5000);
    // this.feedbackForm.reset({
    //   firstname:'',
    //   lastname:'',
    //   telnum:'',
    //   email:'',
    //   agree:false,
    //   contacttype:'None',
    //   message:''
    // });
    // this.feedbackFormDirective.resetForm();

    

  }


  //   onSubmit() {
  //   this.commentInput = this.commentForm.value;
  //   //this.dish.comments.push(this.commentForm.value);
  //   this.dishcopy.comments.push(this.commentInput); 
  //   this.dishservice.putDish(this.dishcopy).subscribe(dish => {
  //       this.dish = dish; this.dishcopy = dish;
  //     },
  //     errmess => { this.dish = null as any; this.dishcopy = null as any; this.errMess = <any>errmess; });
  //   console.log(this.dish.comments,this.commentForm.value )
  //   this.commentForm.reset({
  //   rating: '5',
  //   comment: '',
  //   author: '',
  //   date: Date.now(),
  //   });
  //   this.commentFormDirective.resetForm();
    
  // }
}
