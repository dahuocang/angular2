import {Component} from '@angular/core';

@Component({
    moduleId:module.id,
    selector:'new-hero',
    templateUrl:'add-hero.html'
})
export class AddHeroComponent{

    onSubmit(form:any):void{
        console.log('you have submitted value',form);
    }

}