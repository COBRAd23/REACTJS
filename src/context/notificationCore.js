import { createContext } from 'react';

const NotificationContext = createContext({
  showNotification: () => {},
});

export default NotificationContext;
