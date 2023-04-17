import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { WebService } from './web.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router,public webService:WebService,private jwtHelperService: JwtHelperService) {}
    
    canActivate(){
        const token = localStorage.getItem('token');
        if(token){
            if ((new Date).getTime()/ 1000<this.jwtHelperService.decodeToken(token)["exp"]){
                try{
                    this.jwtHelperService.decodeToken(token)
                    return true; 
                }catch{
                    localStorage.clear();   
                    this.router.navigate(["login"]);
                    return false;
                }

            }else{
                localStorage.clear();   
                this.router.navigate(["login"]);
                return false;
            }
        }else{
            localStorage.clear();   
                this.router.navigate(["login"]);
                return false;
        }
    }

}