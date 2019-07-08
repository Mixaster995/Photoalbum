import { Component, OnInit } from '@angular/core';
import { Photo } from '../models/photo-model';
import { PhotoService } from '../services/photo.service';
import { error } from 'util';


@Component({
    selector: 'main-page',
    styleUrls: [`./main-page.component.css`],
    templateUrl:`./main-page.component.html`,
    providers:[PhotoService]
})
export class MainPageComponent implements OnInit{
    currentPage:number;
    pagesCount:number;
    currentOrder:string;
    photos:Photo[];

    constructor(private httpService:PhotoService){}
    
    ngOnInit(){
        this.currentPage = 1;
        this.currentOrder = "date";
        this.httpService.getPagesCount().subscribe(
            data => this.pagesCount = data,
            error => alert(error)
        );
        this.loadPage();
    }

    loadPage(){
        this.httpService.getPhotos(this.currentPage, this.currentOrder).subscribe(
            data => this.photos = data,
            error => alert(error)
        );        
    }

    pageChanging(newPageNumber:number)
    {
        this.currentPage = newPageNumber;
        this.loadPage();
    }
}