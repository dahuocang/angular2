import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeroDetailComponent } from './heroes/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component'
import { HeroService } from './service/hero.service';
import { RouterModule } from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from '@angular/http';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './dao/in-memory-data.service';
import './core/rxjs-extensions';
import {HeroSearchComponent} from './heroes/hero-search.component'


@NgModule({
  imports: [BrowserModule, FormsModule,AppRoutingModule,HttpModule,InMemoryWebApiModule.forRoot(InMemoryDataService)],
  declarations: [AppComponent, HeroDetailComponent, HeroesComponent,DashboardComponent,HeroSearchComponent],
  bootstrap: [AppComponent],
  providers: [HeroService]
})

export class AppModule { }
;