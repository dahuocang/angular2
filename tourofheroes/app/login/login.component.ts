
import {AuthService} from '../service/auth/auth.service';
import {Component} from '@angular/core';
import {Location} from '@angular/common';
@Component({
    moduleId:module.id,
    selector:'login',
    templateUrl:'login.component.html'
})
export class LoginComponent{
    message:string;
    constructor(public authService:AuthService,private location:Location){
        this.message='';
    }
    login(username:string,password:string):boolean{
        this.message='';
        if(!this.authService.login(username,password)){
      
            this.message='incorrect credentials';
                  console.log(this.message);
            setTimeout(function(){
                this.message='';
            }.bind(this),2500);
        }
        return false;
    }
    logout():boolean{
        this.authService.logout();
        return false;
    }
}