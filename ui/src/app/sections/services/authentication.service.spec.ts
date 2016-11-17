/* tslint:disable:no-unused-variable */
import {TestBed, inject, fakeAsync} from "@angular/core/testing";
import {Http, BaseRequestOptions, Response, ResponseOptions} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {Router} from "@angular/router";
import {Authentication, AuthStatus} from "./authentication.service";

class RouterMock {
  navigateByUrl() {
  }
}

describe('Authentication service', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
          deps: [MockBackend, BaseRequestOptions]
        },
        {provide: Router, useClass: RouterMock},
        Authentication
      ]
    });
  });

  it('should check create instance', inject([Authentication], (auth: Authentication) => {
    expect(auth).toBeTruthy();
  }));


  it('should check doLogin',
    inject([Authentication, MockBackend],
      fakeAsync((auth: Authentication, backend: MockBackend) => {

        let username = 'admin';
        let password = 'admin';
        backend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 200,
                body: JSON.stringify({
                  token: "abc",
                  user: {}
                })
              })
            )
          );
        });
        spyOn(auth, "getServiceApi").and.returnValue("");
        auth.doLogin(username, password).then((response) => {
          expect(response).toBe(AuthStatus.LOGGED_IN);
        });
      })
    )
  );

});
