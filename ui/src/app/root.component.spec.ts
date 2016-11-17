/* tslint:disable:no-unused-variable */

import { TestBed, async } from "@angular/core/testing";
import { RootComponent } from "./root.component";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";

describe("App: ZeroToHero", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RootComponent
      ],
      imports: [BrowserModule, CommonModule, RouterModule.forRoot([])],
    });
  });

  it("should create the app", async(() => {
    let fixture = TestBed.createComponent(RootComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
