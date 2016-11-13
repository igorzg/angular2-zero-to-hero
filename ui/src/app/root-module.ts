import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import {RouterModule} from "@angular/router";
import {RootComponent} from "./root-component";
import {LoginModule} from "./sections/login/login-module";
import {AdminModule} from "./sections/admin/admin-module";

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: "",
        pathMatch: "full",
        redirectTo: "admin"
      }
    ]),
    LoginModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule { }
