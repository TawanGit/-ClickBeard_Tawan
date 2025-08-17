"use client";
import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { useClientStore } from "../../../store/clientStore";
import { getNotificationsNotRead } from "../../../../utils/notifications";
import { NotificationsApi } from "../../../../types/GeneralTypes";
import { NotificationSidebar } from "./modals/NotificationsSidebar";

function Notifications() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationsApi[]>([]);
  const { token } = useClientStore();
  useEffect(() => {
    getNotificationsNotRead(token!, setNotifications);
  });
  return (
    <div>
      <button
        className="relative p-2 rounded-full hover:bg-gray-100  transition-colors"
        onClick={() => setOpenModal(!openModal)}
      >
        <IoIosNotifications className="text-gray-600 text-2xl" />
        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {notifications.length}
        </span>
        {/* ainda não implementado */}
      </button>
      {openModal && (
        <NotificationSidebar
          onClose={() => setOpenModal(false)}
          notifications={notifications}
        />
      )}
    </div>
  );
}

export default Notifications;
