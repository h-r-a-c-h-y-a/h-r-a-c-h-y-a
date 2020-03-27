import {Observable} from 'rxjs';
import {CanDeactivate} from '@angular/router';
import {Injectable} from '@angular/core';

export interface  ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class LeavePageGuard implements CanDeactivate<ComponentCanDeactivate> {

  canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | boolean {

    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
