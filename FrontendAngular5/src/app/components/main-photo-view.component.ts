import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Photo } from '../models/photo-model';
import { PhotoService } from '../services/photo.service';
import { error } from 'util';
import { NgIf } from '@angular/common';
import { AppSettings } from '../app.settings'

@Component({
    selector: 'main-photo-view',
    styleUrls: [`./photo-view.component.css`],
    templateUrl:`./main-photo-view.component.html`,
    providers:[PhotoService]
})
export class MainPhotoViewComponent implements OnInit{
    @Input() inputPhoto: Photo;
    fullPath:string;

    constructor(private httpService:PhotoService){}

    ngOnInit(){
        this.fullPath = AppSettings.Host + "api/photo/get/" + this.inputPhoto.PhotoId;

        var dateString = <any>(new Date(Date.parse(this.inputPhoto.Date)));
        this.inputPhoto.Date = dateString.toGMTString().replace("GMT", "");
    }
    
}