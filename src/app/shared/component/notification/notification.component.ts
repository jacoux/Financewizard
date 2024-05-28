import { Component, OnInit } from '@angular/core';
import { debounceTime, map, tap } from 'rxjs/operators';
import { MaNotification, NotificationType } from '../../types/notofication';
import { NotificationService } from '../notification.service';

//Importing our notification service

@Component({
  selector: 'ma-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  //Flag that is going to be used in the view to determine if the notification should be visible or not.
  showNotification: boolean = false;

  //Notification object with the data that is going to be showed.
  incommingNotification: MaNotification = {
    title: '',
    message: '',
    type: NotificationType.danger,
  };

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    //We subscribe or listens to new values / notification requests.
    this.notificationService.notifyRequest$
      .pipe(
        //we receive new notification and update the values of the notification object we have in this component.
        // we alse make the notification visible.
        tap((notification: MaNotification) => {
          this.incommingNotification = notification;
          this.showNotification = true;
        }),
        //we wait for 3 seconds before updating the visibility of the notification
        debounceTime(3000),
        //3 seconds later, we make our notification invisible again and ready for the value.
        tap(() => {
          this.showNotification = false;
        })
      )
      .subscribe();
  }
}