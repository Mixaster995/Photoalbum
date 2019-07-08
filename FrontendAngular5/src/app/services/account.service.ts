import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserRegister } from '../models/user-register-model';
import { TokenParameters } from '../models/token-parameters-model';
import { UserProfile } from '../models/user-profile-model';
import { ChangePasswordModel } from '../models/change-password-model';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../app.settings';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService {
    private accountPath: string = AppSettings.Host + "api/account/";
    private tokenPath:string = AppSettings.Host + "Token";

    constructor(private http: HttpClient) { }

    register(user: UserRegister):Observable<any> {
        return this.http.post(this.accountPath + "register", user)
                    .pipe(
                        catchError(this.handleError)
                    );
    }

    getToken(login: string, password: string): Observable<TokenParameters> {
        var tokenHeaders = new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"} );
        var data = "grant_type=password&username=" + login + "&password=" + password;
        return this.http.post<TokenParameters>(this.tokenPath, data, { headers: tokenHeaders })
                            .pipe(
                                catchError(this.handleError)
                            );
    }

    getCurrentUserInfo():Observable<UserProfile>{
        return this.http.get<UserProfile>(this.accountPath + "userdata/get", { headers: this.getAuthHeader() })
            .pipe(
                catchError(this.handleError)
            );
    }

    getUserInfoByUserLogin(userLogin:string):Observable<UserProfile>{
        return this.http.get<UserProfile>(this.accountPath + "userdata/get/" + userLogin)
            .pipe(
                catchError(this.handleError)
            );
    }

    changeCurrentUserInfo(newUserInfo:UserProfile):Observable<any>{
        return this.http.post(this.accountPath + "userdata/edit", newUserInfo, { headers: this.getAuthHeader() })
            .pipe(
                catchError(this.handleError)
            );
    }

    changePassword(newPassword:ChangePasswordModel):Observable<any>{
        return this.http.post(this.accountPath + "changePassword", newPassword, { headers: this.getAuthHeader() })
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
          alert("Network troubles. Please, check your connection");
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was:` + JSON.stringify(error.error));
        }
        var errors = [];
        errors.push(error.error.Message + '\n');
        for (var key in error.error.ModelState) {
            for (var i = 0; i < error.error.ModelState[key].length; i++) {
                    errors.push(error.error.ModelState[key][i]);
            }
            errors.push('\n');
        }
        return new ErrorObservable(errors);
      };

    private getAuthHeader(){
        let authHeader = new HttpHeaders();
        let token = localStorage.getItem("token");
        return authHeader.append("Authorization", "Bearer " + token);
    }
}