import {Component} from '@angular/core';
import {Padlet} from "./shared/padlet";
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})


export class AppComponent {

  constructor(private authService: AuthenticationService) {
  }

  //Überprüft pb eingeloggt
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  //Setzt in der Navigation Login oder Logout , je nach dem ob gerade eingeloggt oder nicht
  getLoginLabel() {
    if (this.isLoggedIn()) {
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

