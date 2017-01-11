import {Component} from '@angular/core';
import {FormBuilder,FormGroup} from'@angular/forms';

@Component({
    moduleId:module.id,
    selector:'new-hero2',
    templateUrl:'add-hero2.html'
})
export class AddHeroComponent2{
    myForm:FormGroup;
    constructor(fb:FormBuilder){
        this.myForm=fb.group({
            'heroName':['defaultHeroName']
        });
    }
        onSubmit(value:string):void{
        console.log('you have submitted value',value);
    }
}