import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserRegistrationResponseModel } from "src/models/user-registration-response.model";
import { UserRegistrationModel } from "src/models/user-registration.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  public registerUser(user: UserRegistrationModel): Observable<UserRegistrationResponseModel> {
    return this._http.post<UserRegistrationResponseModel>(`${environment.webApi}/api/auth/register`, user);
  }
}
