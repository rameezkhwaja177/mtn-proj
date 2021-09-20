# Dynamic Form validation 


# Add Jquery Using Angular Cli:npm install jquery --save
# Add Bootstrap using cli :npm install bootstrap --save  // This is optional if we want to use bootstrap in our project.
# Add validation.js at this path: "./src/assets/js/validation.js"

# In angular.json under scripts array
            "styles": [
              "src/styles.css","node_modules/bootstrap/dist/css/bootstrap.min.css" // THis is to add bootstrap.css
            ],
            "scripts": [
              "node_modules/jquery/dist/jquery.min.js",
              "node_modules/bootstrap/dist/js/bootstrap.min.js",
              "./src/assets/js/validation.js"
            ],
  // copy relative path of node_modules>jquery>dist>jquery.min.js to avoid path error

# Now to use jQuery, all you have to do is to import it as follows in whatever component you want to use jQuery.


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
})
export class AppComponent implements OnInit {

jQueryExampleModal() { // to show a modal with dummyId
   $('#dummyId').modal('show');
}

  saveEditInsurance(){
  //  let test= document.getElementById('GetvalueVal') as HTMLElement;
    let frm=$('#GetvalueVal'); // To get whole element on which to be performed.
    if(!validateForm(frm)) return; //validateForm will return flag depending on validation
  }

}




