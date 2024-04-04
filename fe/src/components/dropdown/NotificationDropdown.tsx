type TNotificationDropDownProps = {
  notifications: string[];
  setNotification: React.Dispatch<React.SetStateAction<string[]>>;
  setNotificationDropDown: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function NotificationDropdown({
  notifications,
  setNotification,
  setNotificationDropDown,
}: TNotificationDropDownProps) {
  const handleRead = () => {
    setNotification([]);
    setNotificationDropDown(false);
  };
  return (
    <>
       <div className="absolute w-64 px-3 py-4 bg-white shadow-lg top-8 right-1 md:right-10 md:top-12 z-30">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            return <p className="capitalize py-2">{notification}</p>;
          })
        ) : (
          <p className="text-gray-400 font-semibold text-center">No new notification</p>
        )}
        {notifications.length > 0 && (
          <button
            onClick={handleRead}
            className="bg-blue-600 font-semibold text-white px-2 py-1 w-full"
          >
            Mark as read
          </button>
        )}
      </div>
    </>
  );
}
