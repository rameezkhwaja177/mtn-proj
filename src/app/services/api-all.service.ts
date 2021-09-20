import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiAllService {

  constructor(private _http: HttpClient,
    ) { }


  getService(url) {
    //  this.spinnerService.show();
    const promise = new Promise((resolve, reject) => {
      this._http.get(url).subscribe(
          data => {
            // this.spinnerService.hide();
            resolve(data);
          },
          error => {
            reject(error);

            // this.spinnerService.hide();
            // this.showSnackbar(error);
          }
        );
    });
    return promise;
  }

}
