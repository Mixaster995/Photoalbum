import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Photo } from '../models/photo-model';
import { PhotoInfo } from '../models/photo-info-model';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../app.settings';
import 'rxjs/add/operator/map';

@Injectable()
export class PhotoService {
    private photoPath: string = AppSettings.Host + "api/photo/";

    constructor(private httpClient: HttpClient) { }

    getPhotos(page:number, order:string, username:string = ""):Observable<Photo[]>{
        return this.httpClient.get<Photo>(this.photoPath + "getmany/" + order + "/" + page + "/" + username)
            .pipe(
                catchError(this.handleError)
            );
    }

    getPagesCount(username:string = ""):Observable<number>{
        return this.httpClient.get<number>(this.photoPath + "pagesCount/" + username)
            .pipe(
                catchError(this.handleError)
            );
    }

     uploadFile(fileToUpload: File, title:string, description:string): Observable<any> {
         return this.httpClient.post(this.photoPath + "add/" + title + "/" + description, fileToUpload, { headers: this.getAuthHeader() })
            .pipe(
                catchError(this.handleError)
            );
    }

    editPhoto(editedInfo:PhotoInfo, photoId:number){
        return this.httpClient.put(this.photoPath + "edit" + "/" + photoId, editedInfo, { headers: this.getAuthHeader() })
        .pipe(
            catchError(this.handleError)
        );
    }

    deletePhoto(photoId:number){
        return this.httpClient.delete(this.photoPath + "delete/" + photoId, { headers: this.getAuthHeader() })
        .pipe(
            catchError(this.handleError)
        );
    }

    assessPhoto(photoId:number, assessment:number){
        return this.httpClient.post(this.photoPath + "assess/" + photoId, assessment, { headers: this.getAuthHeader() })
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was:` + JSON.stringify(error.error));
        }
        var errors = [];
        errors.push(error.error.Message + '\n');
        for (var key in error.error.ModelState) {
            for (var i = 0; i < error.error.ModelState[key].length; i++) {
                    errors.push(error.error.ModelState[key][i]);
            }
            errors.push('\n');
        }
        return new ErrorObservable(errors);
      };

    private getAuthHeader(){
        let authHeader = new HttpHeaders();
        let token = localStorage.getItem("token");
        return authHeader.append("Authorization", "Bearer " + token);
    }
}