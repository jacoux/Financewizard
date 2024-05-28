export enum NotificationType {
  success = 'is-success',
  danger = 'is-danger',
  warning = 'is-warning',
}

export interface MaNotification {
  title: string;
  message: string;
  type: NotificationType;
}
