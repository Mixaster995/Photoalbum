import { Input, Component, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { UserRegister } from '../models/user-register-model';
import { Router } from '@angular/router';
import { AppSettings } from '../app.settings';

@Component({
    selector: 'register-page',
    styleUrls: [`./validation-view.css`],
    templateUrl: `./register-page.component.html`,
    providers:[AccountService]
})
export class RegisterPageComponent {
    user = new UserRegister("","","","","","");
    @Output() goHome = new EventEmitter();

    constructor(private httpService: AccountService, private router: Router) { }

    registration() {
        this.httpService.register(this.user).subscribe(
            sucess => this.httpService.getToken(this.user.Login, this.user.Password).subscribe(
                data => { 
                    localStorage.setItem("token", data.access_token); 
                    localStorage.setItem("currentUser", data.userName);
                    var seconds = parseInt(data.expires_in, 10);
                    var milliseconds = seconds*1000 + Date.now();
                    var result = milliseconds.toString();
                    localStorage.setItem("tokenExpiresDate", result);
                    window.location.href = AppSettings.Home;
                    //this.router.navigate(['']);
                }, error => alert(error)),          
            error => { alert(error) } );
    }
}