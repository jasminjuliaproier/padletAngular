import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Padlet, User} from "../shared/padlet";
import {PadletService} from "../shared/padlet.service";
import {Entrie} from "../shared/entrie";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: []
})
export class PadletListComponent implements OnInit{

  padlets: Padlet[] = [];
  entries: Entrie[] = [];

  constructor(private bs: PadletService) {}

  ngOnInit() {
    this.bs.getAllPadlets().subscribe(res=>this.padlets = res);
    this.bs.getAllEntries().subscribe(res=>this.entries = res);
  }
}
