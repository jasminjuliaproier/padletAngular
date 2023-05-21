import { Component } from '@angular/core';
import { Padlet} from "./shared/padlet";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})


export class AppComponent {
  //padlet : any;

  constructor(private authService: AuthenticationService) {}

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    } else {
      return "Login";
    }
  }

  /*constructor(private http: HttpClient){
    http.get<Padlet>('http://padlet.s2010456040.student.kwmhgb.at/api').subscribe(
      data => {
        this.padlet = data;
        console.log(this.padlet);
      }
    );
  }*/
}


    /*
    http.get<Padlet>('http://padlet.s2010456040.student.kwmhgb.at/padlets').
    subscribe(val => this.padlet = val);
    */




  /*
  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }
  showDetails(padlet: Padlet) {
    this.padlet = padlet;
    this.listOn = false;
    this.detailsOn = true;
  }

   */

