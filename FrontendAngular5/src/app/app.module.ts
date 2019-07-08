import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './components/app.component';
import { MainPageComponent } from './components/main-page.component';
import { OtherUserPageComponent } from './components/other-user-page.component';
import { RegisterPageComponent } from './components/register-page.component';
import { LoginPageComponent } from './components/login-page.component';
import { ThisUserPageComponent } from './components/this-user-page.component';
import { ProfilePageComponent } from './components/profile-page.component';
import { ThisPhotoViewComponent } from './components/this-photo-view.component';
import { EqualValidator} from './directives/equal-validator.directive';
import { StarRaitingDirective} from './directives/star-raiting.directive';
import { MainPhotoViewComponent } from './components/main-photo-view.component';
import { StarsComponent } from './components/stars.component';
import { PagerComponent } from './components/pager.component'
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes =[
    { path: '', component: MainPageComponent},
    { path: 'register', component: RegisterPageComponent},
    { path: 'login', component: LoginPageComponent },
    { path: 'my', component: ThisUserPageComponent },
    { path: 'my/profile', component: ProfilePageComponent },
    { path: ':userlogin', component: OtherUserPageComponent},
];

@NgModule({
    imports: [BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(appRoutes, {useHash:true})],
declarations: [
    AppComponent, 
    MainPageComponent, 
    RegisterPageComponent, 
    LoginPageComponent, 
    ProfilePageComponent,
    ThisUserPageComponent, 
    ThisPhotoViewComponent, 
    MainPhotoViewComponent , 
    EqualValidator, 
    StarRaitingDirective, 
    PagerComponent, 
    OtherUserPageComponent,
    StarsComponent
],
    bootstrap: [AppComponent]
})
export class AppModule { }