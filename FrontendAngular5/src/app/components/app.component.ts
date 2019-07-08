import { Component, OnInit, ViewChild } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { ThisUserPageComponent } from './this-user-page.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'my-app',
	styleUrls:[`./app.component.css`],
    templateUrl: `./app.component.html`
  
})
export class AppComponent implements OnInit {
    userAuthorized: boolean;

    constructor(private router: Router){
        this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
         } 
         this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
               this.router.navigated = false;
               window.scrollTo(0, 0);
            }
        });
        this.userAuthorized = false;
    }

    doLogout(){
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("tokenExpiresDate");
        this.userAuthorized = false;
        this.router.navigate(['']);
    }

    ngOnInit(){
        var endTokenDate = parseInt(localStorage.getItem("tokenExpiresDate"));
        if(localStorage.getItem("tokenExpiresDate") != null && endTokenDate > Date.now())
            this.userAuthorized = true;
    }
}