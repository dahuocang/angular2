import {Component} from '@angular/core';
import {FormBuilder,FormGroup,Validators,AbstractControl,FormControl} from'@angular/forms';

@Component({
    moduleId:module.id,
    selector:'new-hero2',
    templateUrl:'add-hero2.html'
})
// use AbstractControl
// export class AddHeroComponent2{
//     heroName:AbstractControl;
//     myForm:FormGroup;
//     constructor(fb:FormBuilder){
//         this.myForm=fb.group({
//             'heroName':['defaultHeroName',Validators.required]
//         });
//         this.heroName=this.myForm.controls['heroName'];
//     }
//         onSubmit(value:string):void{
//         console.log('you have submitted value',value);
//     }
// }


export class AddHeroComponent2{
    myForm:FormGroup;
    heroId:number;//here we are going to use ngModel just define a number type 
    constructor(fb:FormBuilder){
        this.myForm=fb.group({
            'heroName':['',Validators.compose([Validators.required,heroValidator])],
            'heroId':['',Validators.required]
        });
        this.myForm.controls['heroName'].valueChanges.subscribe(
            (value:string)=>{
                console.log('hero name changed to ',value)
            }
        )
        this.myForm.valueChanges.subscribe(
        (form:any)=>{
            console.log('form changed to ',form)
        }
        )
    }
    
        onSubmit(value:string):void{
        console.log('you have submitted value',value);
    }
    
}
function heroValidator(control:FormControl):{[s:string]:boolean}
    {
        if(!control.value.match(/^hero/)){
            return {invalidHero:true};
        }
    }