import { Component,Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { UserLogin } from '../models/user-login-model';
import { TokenParameters } from '../models/token-parameters-model';
import { Router } from '@angular/router';
import { AppSettings } from '../app.settings';

@Component({
    selector: 'login-page',
    styleUrls: [`./validation-view.css`],
    templateUrl: `./login-page.component.html`,
    providers: [AccountService]
})
export class LoginPageComponent {
    user = new UserLogin("", "");

    @Output() goHome = new EventEmitter();

    constructor(private httpService: AccountService, private router: Router) { }

    logIn() {
        this.httpService.getToken(this.user.Login, this.user.Password)
                .subscribe(
                    data => { 
                        localStorage.setItem("token", data.access_token); 
                        localStorage.setItem("currentUser", data.userName);
                        var seconds = parseInt(data.expires_in, 10);
                        var milliseconds = seconds*1000 + Date.now();
                        var result = milliseconds.toString();
                        localStorage.setItem("tokenExpiresDate", result);
                        window.location.href = AppSettings.Home;
                    },
                    error => { alert(error) }
                );
    }
}