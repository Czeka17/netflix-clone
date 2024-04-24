import React from 'react';
import { NotificationProps } from '../../lib/types';

const Notification: React.FC<NotificationProps> = ({ title, message, status }) => {

    let statusClasses = '';

    if(status === 'success'){
        statusClasses = 'bg-green-500 text-white'
    }

    if (status === 'error') {
        statusClasses = 'bg-red-500 text-white';
      }
    if (status === 'pending') {
      statusClasses = 'bg-blue-500 text-white'
    }
      return(
        <div className={`p-4 rounded-md fixed w-full bottom-0 left-0 z-50 ${statusClasses}`}>
      <h2 className="text-lg font-bold">{title}</h2> 
      <p className="text-sm">{message}</p>
    </div>
      )
    }
    export default Notification;