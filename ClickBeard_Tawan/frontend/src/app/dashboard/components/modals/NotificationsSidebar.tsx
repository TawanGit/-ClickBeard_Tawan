import React from "react";
import { NotificationsApi } from "../../../../../types/GeneralTypes";
import {
  formatAppointmentDate,
  formatNotificationMessage,
} from "../../../../../utils/dateHelpers";

interface SidebarProps {
  onClose: () => void;
  notifications: NotificationsApi[];
}

export const NotificationSidebar: React.FC<SidebarProps> = ({
  onClose,
  notifications,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex z-50">
      <div className="ml-auto w-full max-w-sm bg-white h-full shadow-xl p-4 flex flex-col">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-bold">Notificações</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {notifications && notifications.length > 0 ? (
            [...notifications].reverse().map((notification) => (
              <div
                key={notification.id}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-100 transition"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold">
                  N
                </div>
                <div className="flex-">
                  <p className="text-md text-gray-800">
                    {formatNotificationMessage(notification.message)}
                  </p>
                  <span className="text-gray-500 text-sm">
                    {notification.name}
                  </span>
                </div>
                <div className="text-gray-400 text-xs whitespace-nowrap">
                  {formatAppointmentDate(notification.created_at)}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">
              Nenhuma notificação
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
