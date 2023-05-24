import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EntrieFormErrorMessages} from "./entrie-form-error-messages";
import {EntrieFactory} from "../shared/entrie.factory";
import {Entrie} from "../shared/entrie";

@Component({
  selector: 'bs-entrie-form',
  templateUrl: './entrie-form.component.html',
  styles: [
  ]
})
export class EntrieFormComponent implements OnInit{

  entrieForm: FormGroup;
  entrie = EntrieFactory.empty();
  errors: {[key:string] : string} = {};
  isUpdatingEntrie = false;

  constructor(
    private fb: FormBuilder,
    private bs: PadletService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.entrieForm = this.fb.group({});
  }

  // Ein neuer Entrie wird vom Entrie Factory geholt, darin wird wir padlet id aus der route gespeichert
  // Die Entrie_id wird auch aus der Route geholt
  //Überprüfung: Ist beides aus der Route vorhanden? So wird der Entrie Geupdatet!
  //Entrie wird über die Padlet ID gefunden und das Obekt wird zum neuen entrie

  ngOnInit() {
    this.entrie.padlet_id = this.route.snapshot.params['padlet_id'];
    this.entrie.id = this.route.snapshot.params['entrie_id']
    if (this.entrie.padlet_id && this.entrie.id) {
      this.isUpdatingEntrie = true;
      this.bs.findEntrieByPadletId(this.entrie.padlet_id, this.entrie.id).subscribe(entrie => {
        this.entrie = entrie
        this.initEntrie();
      });
    } // Ansonsten wird gleich initEntrie ausgeführt

      this.initEntrie();
    //}

  }

  //Überprüft alle parameter und weißt richtig zu
  //Error meldung falls etwas nicht funktioniert
  initEntrie(){
    this.entrieForm = this.fb.group({
      id: this.entrie.id,
      padlet_id: this.entrie.padlet_id,
      title: [this.entrie.title, Validators.required],
      content: this.entrie.content
    });
    this.entrieForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  submitForm() {
    const entrie: Entrie = EntrieFactory.fromObject(this.entrieForm.value);
    console.log(this.entrieForm.value)
    entrie.user_id = this.entrie.user_id;

    //Wird die Variable oben auf true gesetzt so wird in Folge dieser Codeteil ausgeführt
    // Entrie wird geupdatet
    if (this.isUpdatingEntrie){
      this.bs.updateEntrie(entrie.id,entrie).subscribe(res=>{
        this.router.navigate(["../../../../../padlets/", entrie.padlet_id], {
          relativeTo: this.route
        });
      });
    } else{
      entrie.user_id = parseInt(sessionStorage.getItem("userId") ?? '0', 10);
      entrie.padlet_id = this.entrie.padlet_id;
      entrie.id = this.entrie.id

      //Entrie wird neuerstellt
      this.bs.createEntrie(entrie.padlet_id, entrie).subscribe(res=>{
        this.entrie = EntrieFactory.empty();
        this.entrieForm.reset(EntrieFactory.empty());
        this.router.navigate(["../../../../padlets/", entrie.padlet_id], {
          relativeTo: this.route
        });
      });
    }
  }
  //Error Messages
  updateErrorMessages()
  {
    console.log("Is invalid? " + this.entrieForm.invalid);
    this.errors = {};
    for (const message of EntrieFormErrorMessages) {
      const control = this.entrieForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
