import { FormGroup } from "@angular/forms";

export function fillForm(src: FormGroup,target: any ) {
    for(let key of Object.keys(target)){
        if(src.controls[key]){
            src.controls[key].setValue(target[key]); 
        }
    }
}