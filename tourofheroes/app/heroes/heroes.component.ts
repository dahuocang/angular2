import { Component } from '@angular/core';
import {Hero} from '../domain/hero';
import {HeroService} from '../service/hero.service';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  moduleId:module.id,
  selector: 'my-heroes',
  templateUrl:'heroes.component.html',
  styleUrls:['heroes.component.css']
  // template:'<h1>{{title}}</h1><h2>{{hero.name}} details!</h2><div><label>id: </label>{{hero.id}}</div><div><label>name: </label>{{hero.name}}</div>'
})

export class HeroesComponent  implements OnInit{
  selectedHero:Hero;
  heroes:Hero[];
  onSelect(hero:Hero):void{
  this.selectedHero=hero;
  
};
constructor(private heroService:HeroService,private router:Router){};
getHeroes(): void {
  this.heroService.getHeroesSlowly().then(heroes=>this.heroes=heroes)
}
ngOnInit():void{
  this.getHeroes();
}
gotoDetail():void{
  this.router.navigate(['/detail',this.selectedHero.id]);
}
add(name:string):void{
  name=name.trim();
  if(!name){return;}
  this.heroService.create(name).then(hero=>{this.heroes.push(hero);this.selectedHero=null;});
}
delete(hero:Hero):void{
  this.heroService.delete(hero.id).then(()=>{this.heroes=this.heroes.filter(h=>h!==hero);
  if(this.selectedHero===hero){this.selectedHero=null}});
}
}


