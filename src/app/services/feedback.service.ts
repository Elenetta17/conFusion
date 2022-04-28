import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';





@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor() { }
}
