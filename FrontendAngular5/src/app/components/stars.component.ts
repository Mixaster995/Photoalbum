import { Component, Input, OnInit} from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { error } from 'util';
import { NgIf } from '@angular/common';

@Component({
    selector: 'stars',
    styleUrls: [`./stars.component.css`],
    templateUrl:`./stars.component.html`,
    providers:[PhotoService]
})
export class StarsComponent implements OnInit{
    starIndexes = [1,2,3,4,5];
    userAuthorized:boolean;
    currentUserRaiting:number;
    @Input() raiting: number;
    @Input() photoId: number;

    constructor(private httpService:PhotoService){}

    ngOnInit(){
        var endTokenDate = parseInt(localStorage.getItem("tokenExpiresDate"));
        if(endTokenDate != null && endTokenDate > Date.now()){
            this.userAuthorized = true;
        }
        else{
            this.userAuthorized = false;
        }

        if(this.userAuthorized){          
            var raiting = localStorage.getItem(localStorage.getItem("currentUser") + this.photoId);
            if(raiting != null){
                this.currentUserRaiting = parseInt(raiting, 10);
            }
            else{
                this.currentUserRaiting = 0;
            }
        }
    }

    assessPhoto(asessment:number){
        this.httpService.assessPhoto(this.photoId, asessment).subscribe(
            data => {
                this.raiting = data;
                localStorage.setItem(localStorage.getItem("currentUser") + this.photoId, asessment.toString());
                this.currentUserRaiting = asessment;
            },
            error => alert(error)
        );
    }
    
}