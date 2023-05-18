import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Padlet, User} from '../shared/padlet';
import {Entrie} from "../shared/entrie";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {EntrieFactory} from "../shared/entrie.factory";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})


export class PadletDetailsComponent implements OnInit {

  padlet: Padlet = PadletFactory.empty();
  entries: Entrie [] = [];

  constructor(
    private bs: PadletService,
    private router: Router,
    private route: ActivatedRoute

              ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bs.getSinglePadlet(params['id'])
      .subscribe((p:Padlet) => {
        this.padlet = p ;
      this.entries = this.padlet.entries;
      });

/*
    this.bs.getAllEntries(params['id'])
      .subscribe(res =>{
        console.log(res);
        this.entries = res
      } );*/

  }
}
