import { Injectable } from '@angular/core';
import {Padlet, User} from "./padlet";
import {Entrie} from "./entrie";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PadletService {
  padlets: Padlet[];
  entries: Entrie[];
  constructor() {

    this.padlets = [
      new Padlet(1,
        'Padlet 1', true,
        new User(1,'Jasmin', 'Proier', 'test@test.at', 'secret', 'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png')),
      new Padlet(2,
        'Padlet 2', true,
        new User(1,'Jasmin', 'Proier', 'test@test.at', 'secret', 'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png'))];

    this.entries = [
      new Entrie(1,
        new User(1,'Jasmin', 'Proier', 'test@test.at', 'secret', 'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png'),
        1, 'Ich bin ein Titel', 'Ich bin ein Content'),
      new Entrie(2,
        new User(1,'Jasmin', 'Proier', 'test@test.at', 'secret', 'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png'),
        1, 'Ich bin ein Titel', 'Ich bin ein Content')
    ]

  }

  getAllPadlets(){
    return this.padlets;
  }

  getSinglePadlet(id:number) : Padlet{
    return <Padlet>this.padlets.find(padlet => padlet.id == id);
  }

  getAllEntries(id:number) : Entrie[]{
    return <Array<Entrie>>this.entries.filter(entrie=>entrie.padlet_id == id);
  }

}
