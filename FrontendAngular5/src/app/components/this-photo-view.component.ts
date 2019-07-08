import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Photo } from '../models/photo-model';
import { PhotoInfo } from '../models/photo-info-model';
import { PhotoService } from '../services/photo.service';
import { error } from 'util';
import { NgIf } from '@angular/common';
import { AppSettings } from '../app.settings'

@Component({
    selector: 'this-photo-view',
    styleUrls: [`./photo-view.component.css`],
    templateUrl:`./this-photo-view.component.html`,
    providers:[PhotoService]
})
export class ThisPhotoViewComponent implements OnInit {
    editedPhoto:PhotoInfo;
    @Output() reloadCurrentPage = new EventEmitter();
    @Input() inputPhoto: Photo;
    fullPath : string; 

    constructor(private httpService:PhotoService){
    }

    ngOnInit(){
        this.editedPhoto = new PhotoInfo(
            this.inputPhoto.Title, this.inputPhoto.Description
        );
        this.fullPath = AppSettings.Host + "api/photo/get/" + this.inputPhoto.PhotoId;

        var dateString = <any>(new Date(Date.parse(this.inputPhoto.Date)));
        this.inputPhoto.Date = dateString.toGMTString().replace("GMT", "");
    }

    editPhoto(){
        this.httpService.editPhoto(this.editedPhoto, this.inputPhoto.PhotoId).subscribe(
            data => {
                this.inputPhoto.Title = this.editedPhoto.Title;
                this.inputPhoto.Description = this.editedPhoto.Description;
            },
            error => alert(error)
        );
    }

    deletePhoto(){
        this.httpService.deletePhoto(this.inputPhoto.PhotoId).subscribe(
            success => this.reloadCurrentPage.emit(),
            error => alert(error)
        );
    }
    
}