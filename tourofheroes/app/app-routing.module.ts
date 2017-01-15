import {NgModule} from '@angular/core';
import{RouterModule,Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import{HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './heroes/hero-detail.component';
import {AddHeroComponent} from './heroes/add-hero.component';
import {AddHeroComponent2} from './heroes/add-hero.component2'
import {LoggedInGuard} from './login/login.guard';
const routes:Routes=[
    {
      path: 'heroes',
      component: HeroesComponent
    },
    {
      path:'dashboard',
      component:DashboardComponent,canActivate:[LoggedInGuard]
    },
    {
      path:'',
      redirectTo:'/dashboard',
      pathMatch:'full'
    },
    {
      path:'detail/:id',
      component:HeroDetailComponent
    },
    {
      path:'newhero',
      component:AddHeroComponent
    },
   {
      path:'newhero2',
      component:AddHeroComponent2
    }

];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule],
    providers:[LoggedInGuard]
})
export class AppRoutingModule{}