import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent {
  constructor(private router:Router) {}
  token=localStorage.getItem("token")
  logout(){
    localStorage.clear()
    this.router.navigate(["login"])
  }
  login(){
    this.router.navigate(["login"])
  }
}