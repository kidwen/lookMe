import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { StateModule } from '../state/state.module';
import { RecommendComponent } from './components/home/component/recommend.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const lazyModules: Routes = [{
    path: 'potal',
    loadChildren: () => import('../../modules/portal/portal.module').then(m => m.PotalModule),
}, {
    path: 'user',
    loadChildren: () => import('../../modules/user/user.module').then(m => m.UserModule),
}];

const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
}, {
    path: 'login',
    component: LoginComponent,
}, {
    path: 'home',
    component: HomeComponent,
    children: [
        {
            path: '',
            redirectTo: 'potal',
            pathMatch: 'full',
        },
        ...lazyModules,
    ],
}, {
    path: '**',
    redirectTo: 'home',
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        IonicModule,
        CommonModule,
        FormsModule,
        SharedModule,
        StateModule,
    ],
    declarations: [
        HomeComponent,
        LoginComponent,
        RecommendComponent,
    ],
    exports: [],
    providers: [
        { provide: JWT_OPTIONS, useValue: {} },
        JwtHelperService,
    ],
})
export class TankModule { }
