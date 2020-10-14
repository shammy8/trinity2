import { Injectable } from '@angular/core';
import {
  EntityServiceAction,
  filterMethod,
  NgEntityServiceNotifier,
} from '@datorama/akita-ng-entity-service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notifier: NgEntityServiceNotifier) {}

  listen() {
    this.notifier.action$.pipe(filterMethod('POST')).subscribe((action) => {
      this.message(action);
    });

    this.notifier.action$.pipe(filterMethod('DELETE')).subscribe((action) => {
      this.message(action);
    });
  }

  private message(action: EntityServiceAction) {
    if (action.type === 'success') {
      webix.message({
        text: `Successfully ${action.method === 'POST' ? 'Saved' : 'Deleted'}`,
        type: action.type,
        expire: 5000,
      });
    } else {
      webix.message({
        text: `Error ${action.payload.error.error.code}: ${action.payload.error.error.description}`,
        type: action.type,
        expire: 5000,
      });
    }
  }
}
