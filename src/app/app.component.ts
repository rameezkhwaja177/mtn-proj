import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var H: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public constructor(private _router: Router,) {

  }

  ngOnInit(): void {
    console.dir('app component');
    this._router.navigate(["/login"]);
  }  


  title = 'here-project';
}
