"use client";

import FriendRequests from "../Friends/FriendRequest";
import SendFriendRequests from "../Friends/RequestSend";

export default function SidebarRight() {
  return (
    <aside className="hidden lg:block w-1/5 p-4 sticky top-28 self-start">
      <FriendRequests limit={3} />
      <SendFriendRequests limit={3} />
    </aside>
  );
}
