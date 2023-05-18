import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Padlet, User} from '../shared/padlet';
import {Entrie} from "../shared/entrie";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {EntrieFactory} from "../shared/entrie.factory";
import {UserFactory} from "../shared/user-factory";
import {RatingFactory} from "../shared/rating-factory";
import {Rating} from "../shared/rating";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})

export class PadletDetailsComponent implements OnInit {

  padlet: Padlet = PadletFactory.empty();
  entries: Entrie [] = [];
  user: User = UserFactory.empty();
  rating: Rating [] = [];
  comment: Comment [] = [];

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
      this.user = this.padlet.user;
        for(let e of this.entries){
          e.ratings = [];
          console.log(e.ratings);
          this.bs.getSingleEntrie(e.id)
            .subscribe((x:Entrie) => {
              e.ratings = x.ratings;
              console.log(e);
            });
        }

      });

  }

}
