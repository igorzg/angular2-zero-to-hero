import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AdminComponent} from "./admin-component";
import {AdminGuardian} from "./admin-guardian";

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: "admin",
        canActivate: [AdminGuardian],
        component: AdminComponent
      }
    ])
  ],
  providers: [AdminGuardian],
})
export class AdminModule{}
