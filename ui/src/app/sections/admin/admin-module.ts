import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AdminComponent} from "./admin-component";

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: "admin",
        component: AdminComponent
      }
    ])
  ],
  providers: [],
})
export class AdminModule{}
