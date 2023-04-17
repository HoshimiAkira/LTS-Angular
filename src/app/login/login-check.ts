import { AbstractControl } from "@angular/forms";

export function loginCheck(control: AbstractControl) {
    var check=sessionStorage.getItem("message")
    var result = false
    if(check==null){
        return null
    }
    else
    return {'loginCheck': {value: check}}
  }