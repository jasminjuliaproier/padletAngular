import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Padlet, User} from '../shared/padlet';
import {Entrie} from "../shared/entrie";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {UserFactory} from "../shared/user-factory";
import {Rating} from "../shared/rating";
import {Comment} from "../shared/comment";
import {AuthenticationService} from "../shared/authentication.service";

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

  comment: string = ""


  constructor(
    private bs: PadletService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService

              ) {}

  //Speichert den Routen Parameter ID unf sucht damit ein bestimmtes Padlet
  //Entries dieses Padlets werden in den leeren Array gespeichert
  //Selbiges mit User
  //Holt noch die Kommentare und die Ratings von den Entries um diese im html auszugeben
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bs.findPadletByPadletID(params['id'])
      .subscribe((p:Padlet) => {
        this.padlet = p ;
      this.entries = this.padlet.entries;
      this.user = this.padlet.user;
      this.getRatings();
      this.getComments();
      });
  }

  //Holt Kommentare über die Entrie ID
  getComments() : void {
    for (let entrie of this.entries) {
      this.bs.findCommentsByEntrieID(entrie.id).subscribe((res: Comment[]) => {
        entrie.comments = res;
      });
    }
  }

  //Holt Ratings über die Entrie ID
  getRatings() : void {
    for(let entrie of this.entries) {
      this.bs.findRatingsByEntrieID(entrie.id).subscribe((res: Rating[]) => {
        entrie.ratings = res;
      })
    }
  }
  //Holt Ratings
  getRating(rating: number) {
    return Array(rating)
  }

  //Padlet löschen?
  removePadlet() {
    if (confirm('Padlet wirklich löschen?')) {
      this.bs.remove(this.padlet.id)
        .subscribe((res: any) => this.router.navigate(['../'], {
          relativeTo:
          this.route
        }));
    }
  }

  //Confirmation- Entrie löschen?
  removeEntry(id: number) {
    if (confirm('Entrie wirklich löschen?')) {
      this.bs.removeEntrie(id).subscribe((res: any) => this.router.navigate(['/padlets/'+ this.padlet.id], {
        relativeTo:
        this.route
      }));
    }
  }

  changeComment(event: Event) {
    this.comment = (event.target as HTMLInputElement).value
    console.log(this.comment)
  }

  createComment(id: number) {
    console.log(id);
    const user_id = sessionStorage.getItem('userId');
    if (user_id){
      this.bs.createComment(id, this.comment, parseInt(user_id)).subscribe((res: any) => location.reload())
    }
  }
}


