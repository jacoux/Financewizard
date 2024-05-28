import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MaNotification } from '../types/notofication';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifyRequest = new ReplaySubject<MaNotification>();

  notifyRequest$ = this.notifyRequest.asObservable();

  constructor() {}

  notify(notification: MaNotification) {
    this.notifyRequest.next(notification);
  }
}
