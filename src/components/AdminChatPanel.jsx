import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatBox from "./ChatBox";



export default function AdminChatPanel() {
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const token = localStorage.getItem("token");

  //Fetch all conversations (your existing endpoint)
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          `${"http://localhost:5000"}/api/chat/conversations`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setConversations(res.data || []);
      } catch (err) {
        console.error("Failed to fetch conversations:", err);
      }
    };
    fetchConversations();
  }, [token]);
  return (
    <div className="flex h-[80vh] bg-gray-50 rounded-xl shadow-soft overflow-hidden">
      {/* Sidebar: List of user conversations */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto bg-white">
        <div className="p-4 font-semibold text-gray-700 border-b bg-gray-50">
          Active Conversations
        </div>
        {conversations.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No active conversations yet.
          </p>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.conversationId}
              onClick={() => setSelectedConv(conv)}
              className={`cursor-pointer p-4 border-b hover:bg-gray-100 transition ${
                selectedConv?.conversationId === conv.conversationId
                  ? "bg-blue-50"
                  : ""
              }`}
            >
              <p className="font-medium text-gray-800">
                {conv.user?.name || "Unknown User"}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {conv.lastMessage?.text || "No messages yet"}
              </p>
              {conv.unreadCount > 0 && (
                <span className="inline-block mt-1 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                  {conv.unreadCount} unread
                </span>
              )}
            </div>
          ))
        )}
      </div>
      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedConv ? (
          <ChatBox
            label={`Chat with ${selectedConv.user?.name || "User"}`}
            conversationIdProp={selectedConv.conversationId}
            isAdmin={true}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}