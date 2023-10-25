import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertMode = new BehaviorSubject<boolean | null>(null);


  constructor() { }

}
