import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { UserProfile } from'../models/user-profile-model';
import { ChangePasswordModel } from'../models/change-password-model';
import {AccountService} from'../services/account.service';
import { error } from 'util';
import { Router } from '@angular/router';

@Component({
    selector: 'profile-page',
    styleUrls: [`./validation-view.css`],
    templateUrl: `./profile-page.component.html`,
    providers:[AccountService]
})
export class ProfilePageComponent implements OnInit {
    newCredentials:ChangePasswordModel;
    editing:boolean;
    responseUserData: UserProfile;
    editedUserData: UserProfile;

    constructor(private httpService:AccountService, private router: Router){
        this.newCredentials = new ChangePasswordModel("","","");
        this.editing = false;
    }

    ngOnInit(){
        var endTokenDate = parseInt(localStorage.getItem("tokenExpiresDate"));
        if(endTokenDate != null && endTokenDate > Date.now()){
            this.getUserInfo();
        }
        else{
            this.router.navigate(['login']);
        }
    }
 
    getUserInfo(){
        this.httpService.getCurrentUserInfo().subscribe(
            (data:UserProfile) => {
                this.responseUserData = data;
                this.editedUserData = new UserProfile(data.FirstName, data.LastName, data.Email);
            },
            error => {alert(error)}        
        )
    }

    toggleEditWindow(){
        this.editing = !this.editing;
    }

    editUserData(){
        this.httpService.changeCurrentUserInfo(this.editedUserData).subscribe(
            success => {
                 this.getUserInfo();
                 this.toggleEditWindow(); 
            },
            error=> { alert(error); }
        );
    }
    
    changePassword()
    {
        this.httpService.changePassword(this.newCredentials).subscribe(sucess => alert('success'), error => alert(error));
    }
}