import {NgModule} from "@angular/core";
import {LoginModule} from "./login/login.module";
import {Authentication} from "./services/authentication.service";
import {AdminModule} from "./admin/admin.module";
import {HttpService} from "./services/http.service";

@NgModule({
  imports: [
    LoginModule,
    AdminModule
  ],
  providers: [Authentication, HttpService]
})
export class RootRoutingModule {}
