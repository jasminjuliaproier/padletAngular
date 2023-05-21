import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {PadletDetailsComponent} from "./padlet-details/padlet-details.component";
import {RouterModule, Routes} from "@angular/router";
import { NgModule } from "@angular/core";
import {EntrieItemComponent} from "./entrie-item/entrie-item.component";
import {PadletFormComponent} from "./padlet-form/padlet-form.component";
import {EntrieFormComponent} from "./entrie-form/entrie-form.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: '', redirectTo: 'padlets', pathMatch: 'full'},
  { path: 'padlets', component: PadletListComponent},
  { path: 'padlets/:id', component: PadletDetailsComponent},
  { path: 'padlets/:id/entries', component: EntrieItemComponent},
  { path: 'admin/padlets', component: PadletFormComponent},
  { path: 'admin/padlets/:id', component: PadletFormComponent},
  { path: 'admin/padlets/:padlet_id/entries', component: EntrieFormComponent},
  { path: 'admin/padlets/:padlet_id/entries/:entrie_id', component: EntrieFormComponent},
  {path: 'login', component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}
