import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [

    {
        path:'',redirectTo:"login",pathMatch:"full"
    },
    
    {
      path:'login',component:LoginComponent
    },
    {
        path:'register',component:RegisterationComponent
    },
    
    {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
    }, 
     
    {
      //must be at last
      path:'**',component:PageNotFoundComponent
    }
  ];