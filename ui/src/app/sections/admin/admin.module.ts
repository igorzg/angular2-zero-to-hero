import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {AdminGuardian} from "./admin-guardian";
import {SideBarComponent} from "./components/side-bar/side-bar.component";
import {CommonModule} from "@angular/common";
import {UsersListComponent} from "./sections/users/list/users-list.component";
import {UsersAddComponent} from "./sections/users/add/users-add.component";

@NgModule({
  declarations: [
    AdminComponent, SideBarComponent, UsersListComponent, UsersAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "admin",
        canActivate: [AdminGuardian],
        component: AdminComponent,
        children: [
          {
            path: "list",
            component: UsersListComponent
          },
          {
            path: "add",
            component: UsersAddComponent
          },
          {
            path: "",
            redirectTo: "list",
            pathMatch: "full"
          }
        ]
      }

    ])
  ],
  providers: [AdminGuardian],
})
export class AdminModule {}
