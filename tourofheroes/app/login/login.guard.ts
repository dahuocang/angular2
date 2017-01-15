import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../service/auth/auth.service';
@Injectable()
export class LoggedInGuard implements CanActivate{
    constructor(private authService:AuthService){}
    canActivate():boolean{
        console.log(this.authService.isLoggedIn());
    return this.authService.isLoggedIn();
    }
}