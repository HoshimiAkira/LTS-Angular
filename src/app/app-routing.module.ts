import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuideComponent } from './guide/guide.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth-guard';
import { GroupManageComponent } from './group-manage/group-manage.component';

const routes: Routes = [
  {
    path:"guide",
    component:GuideComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"admin",
    component:AdminComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"groupManage",
    component:GroupManageComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"**",
    component:GuideComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
