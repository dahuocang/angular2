import {Injectable} from '@angular/core';
import {Hero} from '../domain/hero';
// import {HEROES} from './mock-heroes';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import { Observable }     from 'rxjs/Observable';
import {Http,Headers,Response} from '@angular/http';
@Injectable()
export class HeroService{
    private heroesUrl ='api/heroes';
    private headers=new Headers({'Content-Type':'application/json'});
    constructor(private http:Http){}
    // getHeroes():Promise<Hero[]> {return Promise.resolve(HEROES);}
    getHeroes():Promise<Hero[]>{

        return this.http.get(this.heroesUrl).toPromise().then(response=>response.json().data as Hero[]).catch(this.handleError);

    }

       getHeroes2():Observable<Hero[]> {

        return this.http.get(this.heroesUrl).map((r:Response)=>r.json().data as Hero[]);
    }

    private handleError(error:any):Promise<any>{
        console.error("an error occured",error);
        return Promise.reject(error.message||error)
    }
    getHeroesSlowly():Promise<Hero[]>{
        return new Promise(resolve=>{
            setTimeout(()=>resolve(this.getHeroes()),5000)
        })
    }
    getHero(id:number):Promise<Hero>{
        const url=`${this.heroesUrl }/${id}`;//注意这里不是单引号

        return this.http.get(url).toPromise().then(response=>response.json().data as Hero).catch(this.handleError)
    }
    update(hero:Hero):Promise<Hero>{

        const url=`${this.heroesUrl}/${hero.id}`;
        return this.http.put(url,JSON.stringify(hero),{headers:this.headers}).toPromise().then(()=>hero).catch(this.handleError)
    }
    create(name:string):Promise<Hero>{
        return this.http.post(this.heroesUrl,JSON.stringify({name:name}),{headers:this.headers}).toPromise().then(res=>res.json().data).catch(this.handleError)
    }
    delete(id:number):Promise<void>{
        const url=`${this.heroesUrl}/${id}`;
        return this.http.delete(url,{headers:this.headers}).toPromise().then(()=>null).catch(this.handleError)
    }

}