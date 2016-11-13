import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { RootComponent } from "./root-component";
import { RootRoutingModule } from "./sections/root-routing-module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: "",
        pathMatch: "full",
        redirectTo: "admin"
      }
    ]),
    RootRoutingModule
  ],
  providers: [CommonModule],
  bootstrap: [RootComponent]
})
export class RootModule { }
