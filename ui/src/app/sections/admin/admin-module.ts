import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AdminComponent} from "./admin-component";
import {AdminGuardian} from "./admin-guardian";
import {SideBarComponent} from "./components/side-bar/side-bar-component";

@NgModule({
  declarations: [
    AdminComponent, SideBarComponent
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
