import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Padlet, User} from "../shared/padlet";
import {PadletService} from "../shared/padlet.service";
import {Entrie} from "../shared/entrie";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: []
})
export class PadletListComponent implements OnInit{

  padlets: Padlet[] = [];
  entries: Entrie[] = [];

  constructor(private bs: PadletService, public authService: AuthenticationService) {}

  // Holt alle Padlets und Entries
  ngOnInit() {
    this.bs.getPadlets().subscribe(res=>this.padlets = res);
    this.bs.getEntries().subscribe(res=>this.entries = res);
  }

}
