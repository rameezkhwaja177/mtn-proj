import {Action} from '@ngrx/store';

export enum  CustomerActionTypes{
    Add = '[Customer Component] Add',
    Remove = '[Customer Component] Remove'
};


export class ActionEx implements Action {
    readonly type;
    payload: any;
  }


export class addcustomer implements ActionEx{
    readonly type='add';
    constructor(public payload:any){     
        console.dir(this.payload)
    }       

}

export class removecustomer implements ActionEx{
    readonly type='remove';
    constructor(public payload:any){     
        console.dir(this.payload)
    }   
}   