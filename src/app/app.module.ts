import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';

import {HttpClientModule} from '@angular/common/http';
import { baseURL } from './shared/baseurl';


import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



import { AppComponent } from './app.component';

import {MatListModule} from '@angular/material/list'

import 'hammerjs';

import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

import { AppRoutingModule} from './app-routing/app-routing.module';
import { MatSelectModule} from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider'; 
import { ReactiveFormsModule } from '@angular/forms';

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';

import { LeaderService } from './services/leader.service';
import { LoginComponent } from './login/login.component';
import { HighlightDirective } from './directives/highlight.directive';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    HttpClientModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  entryComponents : [
    LoginComponent
  ],
  providers: [DishService, PromotionService, LeaderService,  {provide: 'BaseURL', useValue: baseURL}, ProcessHTTPMsgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
