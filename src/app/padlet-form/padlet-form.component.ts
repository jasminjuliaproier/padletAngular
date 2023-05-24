import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletFactory} from "../shared/padlet-factory";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFormErrorMessages} from "./padlet-form-error-messages";
import {Padlet} from "../shared/padlet";

@Component({
  selector: 'bs-padlet-form',
  templateUrl: './padlet-form.component.html',
  styles: []
})
export class PadletFormComponent implements OnInit {
  padletForm: FormGroup;
  padlet = PadletFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingPadlet = false;

  constructor(
    private fb: FormBuilder,
    private bs: PadletService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.padletForm = this.fb.group({});
  }

  //Initialisiert die Komponente und ruft die Methode "initPadlet" auf.
  //Holt die padlet_id aus der Route,
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id)
    if (id) {
      this.isUpdatingPadlet = true;
      this.bs.findPadletByPadletID(id).subscribe(padlet => {
        this.padlet = padlet;
        this.initPadlet();
      });
    }
    this.initPadlet();
  }

  //Initialisiert das Padlet-Formular und fügt Validierungen hinzu.
  initPadlet() {
    this.padletForm = this.fb.group({
      id: this.padlet.id,
      name: [this.padlet.name, Validators.required],
      is_public: [Boolean(this.padlet.is_public)],
      image: this.padlet.image
    });
    this.padletForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());

  }

//Verarbeitet das Formular und erstellt oder aktualisiert ein Padlet.
  submitForm() {
    const padlet: Padlet = PadletFactory.fromObject(this.padletForm.value);
    padlet.user = this.padlet.user;
    padlet.image = this.padlet.image;

//Wenn isUpdating oben true gesetzt wird, dann update das Padlet
    if (this.isUpdatingPadlet) {
      this.bs.update(padlet).subscribe(res => {
        this.router.navigate(["../../../padlets", padlet.id], {
          relativeTo: this.route
        });
      });
      //Ansonsten erstelle ein Padlet , derzeit mit einem Dummy Bild
    } else {
      padlet.image = 'https://images.unsplash.com/photo-1519222970733-f546218fa6d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
      padlet.user_id = parseInt(sessionStorage.getItem("userId") ?? '0', 10);
      this.bs.create(padlet).subscribe(res => {
        this.padlet = PadletFactory.empty();
        this.padletForm.reset(PadletFactory.empty());
        this.router.navigate(["../../padlets"], {
          relativeTo: this.route
        });
      });
    }
  }

//Fehlermeldungen anhand der Validierungen
  updateErrorMessages() {
    console.log("Is invalid? " + this.padletForm.invalid);
    this.errors = {};
    for (const message of PadletFormErrorMessages) {
      const control = this.padletForm.get(message.forControl);
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

