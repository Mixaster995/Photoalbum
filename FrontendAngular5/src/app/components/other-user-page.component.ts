import { Component, OnInit } from '@angular/core';
import { Photo } from '../models/photo-model';
import { PhotoService } from '../services/photo.service';
import { error } from 'util';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Subscription } from 'rxjs/Subscription';
import { UserProfile } from '../models/user-profile-model';

@Component({
    selector: 'other-user-page',
    styleUrls: [`./main-page.component.css`],
    templateUrl:`./other-user-page.component.html`,
    providers:[PhotoService, AccountService]
})
export class OtherUserPageComponent implements OnInit{
    currentPage:number;
    pagesCount:number;
    currentOrder:string;
    userlogin:string;
    currentUser:UserProfile;
    photos:Photo[];
    private subscription: Subscription;

    constructor(private activateRoute: ActivatedRoute, private photoService:PhotoService, 
        private accountService:AccountService, private router:Router){
            this.currentUser = new UserProfile("","","");
            this.subscription = activateRoute.params.subscribe(params=>this.userlogin=params['userlogin']);
    }
    
    ngOnInit(){
        this.currentPage = 1;
        this.currentOrder = "date";
        this.accountService.getUserInfoByUserLogin(this.userlogin).subscribe(
            data => this.currentUser = data,
            error => this.router.navigate([''])      
        );
        this.photoService.getPagesCount(this.userlogin).subscribe(
            data => this.pagesCount = data,
            error => alert(error)
        );
        this.loadPage();
    }

    loadPage(){
        this.photoService.getPhotos(this.currentPage, this.currentOrder, this.userlogin).subscribe(
            data => this.photos = data,
            error => alert(error) 
        )
    }

    pageChanging(newPageNumber:number)
    {
        this.currentPage = newPageNumber;
        this.loadPage();
    }
}