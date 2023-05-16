import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Padlet, User} from "../shared/padlet";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: []
})
export class PadletListComponent implements OnInit{
  constructor() {}
  padlets: Padlet[] = [];

  @Output() showDetailsEvent = new EventEmitter<Padlet>();
  ngOnInit() {
    this.padlets = [
      new Padlet(1,
        'Padlet 1', true,
        new User(1,'Jasmin', 'Proier', 'test@test.at', 'secret', 'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png')),
      new Padlet(2,
        'Padlet 2', true,
        new User(1,'Jasmin', 'Proier', 'test@test.at', 'secret', 'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png'))
    ]
  }

  showDetails(padlet:Padlet) {
    this.showDetailsEvent.emit(padlet);
  }



}
