import { addListener } from '../application/browser';

export const enableOfflineSupport = () => {
   addListener('online', onlineListener);
   addListener('offline', offlineListener);

   const serviceWorker = navigator.serviceWorker;
   if (serviceWorker) {
      //serviceWorker.register('service-worker.js', { scope: '/' });
   }   
}

const onlineListener = () => {
}

const offlineListener = () => {
}