import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Photo } from '../models/photo-model';
import { PhotoInfo } from '../models/photo-info-model';
import { PhotoService } from '../services/photo.service';
import { error } from 'util';
import { Router } from '@angular/router';

@Component({
    selector: 'this-user-page',
    styleUrls: [`./validation-view.css`, `./this-user-page.component.css`],
    templateUrl: `./this-user-page.component.html`,
    providers:[PhotoService]
})
export class ThisUserPageComponent implements OnInit{
    photos:Photo[];
    currentPage:number;
    photoInfo : PhotoInfo;
    fileForUploading: File;
    isFileChosen: boolean;
    pagesCount:number;

    constructor(private httpService:PhotoService, private router: Router){
        this.isFileChosen = false;
    }
    
    ngOnInit(){
        var endTokenDate = parseInt(localStorage.getItem("tokenExpiresDate"));
        if(endTokenDate != null && endTokenDate > Date.now()){
            this.photoInfo = new PhotoInfo("","");
            this.currentPage = 1;
            this.httpService.getPagesCount(localStorage.getItem("currentUser")).subscribe(
                data => this.pagesCount = data,
                error => alert(error)
            );
            this.loadPage();
        }
        else{
            this.router.navigate(['login']);
        }
    }

    loadPage(){
        this.httpService.getPhotos(this.currentPage, "date", localStorage.getItem("currentUser")).subscribe(
            data => this.photos = data,
            error => alert(error)        
        )
    }

    addFile(inputFiles:FileList){
        this.fileForUploading = inputFiles[0];
        if(this.fileForUploading != null)
            this.isFileChosen = true;
    }

    addPhoto(title:string, description:string){
        this.httpService.uploadFile(this.fileForUploading, this.photoInfo.Title, this.photoInfo.Description).subscribe(
            sucess => {alert('Photo uploaded successfully!'); this.ngOnInit()},
            error => alert(error)
        )
    }

    pageChanging(newPageNumber:number)
    {
        this.currentPage = newPageNumber;
        this.loadPage();
    }
}