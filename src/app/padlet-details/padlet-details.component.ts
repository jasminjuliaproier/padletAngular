import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Padlet, User} from '../shared/padlet';
import {Entrie} from "../shared/entrie";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})
export class PadletDetailsComponent implements OnInit {
  @Input() padlet: Padlet | undefined;
  @Output() showListEvent= new EventEmitter<any>();

  showPadletList(){
    this.showListEvent.emit();
  }

  entries: Entrie[] = [];
  ngOnInit() {
    this.entries = [
      new Entrie(1,
        new User(1,'Jasmin', 'Proier', 'test@test.at', 'secret', 'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png'),
        new Padlet(1,
          'Padlet 1', true,
          new User(1,'Jasmin', 'Proier', 'test@test.at', 'secret', 'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png')),"Ich bin ein Content",
        "Ich bin ein content"),
    ]
  }
}
