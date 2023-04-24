function Notification(props){
    const {title, message, status} = props;

    let statusClasses = '';

    if(status === 'success'){
        statusClasses = 'bg-green-500 text-white'
    }

    if (status === 'error') {
        statusClasses = 'bg-red-500 text-white';
      }
      return(
        <div className={`p-4 rounded-md ${statusClasses}`}>
      <h2 className="text-lg font-bold">{title}</h2> 
      <p className="text-sm">{message}</p>
    </div>
      )
    }
    export default Notification;