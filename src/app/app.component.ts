import { Component } from '@angular/core';
import { Padlet} from "./shared/padlet";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})


export class AppComponent {
  title = 'padletAngularApp';
  listOn = true;
  detailsOn = false;
  padlet : Padlet | undefined;

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }
  showDetails(padlet: Padlet) {
    this.padlet = padlet;
    this.listOn = false;
    this.detailsOn = true;
  }
}