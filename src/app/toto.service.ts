import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotoService {

  list = ["a", "b", "c"];

  constructor() { }

  getToto() {
    return this.list;
  }

}
