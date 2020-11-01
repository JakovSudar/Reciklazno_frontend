import { notification } from 'antd';
export function errorNotification(title,message){
    notification.error({
        style: {
            border: "1px solid red"
        },
        duration: "2",
        message: title,
        description: message,
        placement: "bottomRight"
      });
}