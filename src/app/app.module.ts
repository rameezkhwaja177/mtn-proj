import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HereMapComponent } from './here-map/here-map.component';
import { FormsModule } from '@angular/forms';
import { HereMapNewComponent } from './here-map-new/here-map-new.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CustomerReducer } from './customer.reducer';
//import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    AppComponent,
    HereMapComponent,
    HereMapNewComponent,
    FormValidationComponent,
    LoginPageComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
   StoreModule.forRoot({ customers: CustomerReducer })
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
