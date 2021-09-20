import { Component, OnInit } from '@angular/core';
import {Store, select} from '@ngrx/store';
import { addcustomer,removecustomer } from '../customer.action';
import { Observable } from 'rxjs';
declare var $: any;
declare const validateForm: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  employeeDetails:any={ 
    'email':'',
    'password':''
  };
  name:any;
  password:any;
  customers1: Observable<any[]>;


  constructor(private store: Store<{ customers: any[] }>) {
    this.customers1 = store.pipe(select('customers'));
    console.dir(this.customers1)
    //tetsttsst
   }

  ngOnInit() { 
  }
  addcustomer(){
    let frm=$('#GetvalueVal');
    if(!validateForm(frm)) return; 
    this.store.dispatch(new addcustomer({'name':this.employeeDetails.email,'password':this.employeeDetails.password}))  
  }

}
