import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
declare var $: any;
declare const validateForm: any;
//declare function validateForm(val):any;

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {
  test:any='Hiii test';
  @ViewChild('GetvalueVal1') content: ElementRef;

  employeeDetails:any={
    'name':'Rameez',
    'mi':'',
    'lastname':'',
    'suffix':'III',
    'sex':'',
    'dob':'',
    'phone':'',
    'PhoneType':'',
    'email':'',
    'addr':'',
    'addr2':'',
    'city':'',
    'state':'',
    'zipcode':'',
    'isminor':'',
  };
  name: any;
  constructor() { 
// optional chaining in angular;
// differennt operator in angular
// optional chaning in angular
// different guard in angular
// how to load module on depending on condition
//carbon design 
//graftql
//reactive library
//state management
   }

  ngOnInit() {
    var self=this;

    $(document).ready(function(){
        console.dir(self.test);
    });


    
  }

  saveEditInsurance(){
  //  let test= document.getElementById('GetvalueVal') as HTMLElement;
    let frm=$('#GetvalueVal');
    console.dir(validateForm(frm));
    console.dir(this.employeeDetails);

    // if(!validateForm(this.content)){
    //   console.dir('validation fail'); return;
    // }
   // console.dir('Validation Success');

  }

}
