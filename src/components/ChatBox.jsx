import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";



export default function ChatBox({ label = "Talk to a pharmacist", conversationIdProp = null, isAdmin = false }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [typingFrom, setTypingFrom] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const conversationId = conversationIdProp || (user && user._id);
  useEffect(() => {
  if (!token || !conversationId) return;
  
  const user = JSON.parse(localStorage.getItem("user"));
  const socketToken = user?.email && localStorage.getItem(`socket_token_${user.email}`);

  const socket = io("http://localhost:5000", {
    auth: { token: socketToken || localStorage.getItem("token") },
    transports: ["websocket", "polling"],
    reconnectionAttempts: 10, // increased for stability
    reconnectionDelay: 1000,
  });
  socketRef.current = socket;
  socket.on("connect", () => {
    setIsConnected(true);
    socket.emit("get_unread_count");
  });
  socket.on("disconnect", (reason) => {
    setIsConnected(false);
    console.log(":red_circle: Socket disconnected:", reason);
  });
  // :white_check_mark: NEW: before each reconnection attempt, always reattach a fresh token
  socket.io.on("reconnect_attempt", (attempt) => {
    const latestToken = localStorage.getItem("token");
    socket.auth = { token: latestToken };
    console.log(`:repeat: Reconnect attempt #${attempt} with updated token`);
  });
  // :white_check_mark: NEW: handle auth errors gracefully (if backend sends one)
  socket.on("auth_error", (data) => {
    console.warn("Socket auth error:", data.message);
    // You can choose to refresh token or show a toast instead of logging out user
  });
  socket.on("message", (msg) => {
    if (msg.conversationId === conversationId) {
      setMessages((s) => [...s, msg]);
      if (msg.to && user && msg.to === user._id) {
        socket.emit("mark_read", { conversationId });
      }
    }
  });
  socket.on("typing", ({ userId, isTyping }) => {
    setTypingFrom(isTyping ? userId : null);
  });
  socket.on("new_user_message", (data) => {
    if (isAdmin) {
      console.log("Admin notification: new message", data);
      // Optionally show toast or refresh list
    }
  });
  socket.on("error_message", (payload) => {
    console.error("Socket error:", payload);
  });
  // Cleanup
  return () => {
    socket.disconnect();
    socketRef.current = null;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [token, conversationId]);


  // fetch history when chat opens
  useEffect(() => {
    if (!isOpen || !conversationId) return;
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE || "http://localhost:5000"}/api/chat/messages/${conversationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data || []);
        // Mark read on open
        socketRef.current?.emit("mark_read", { conversationId });
      } catch (err) {
        console.error("Failed to fetch chat history", err);
      }
    };
    fetchHistory();
  }, [isOpen, conversationId, token]);
  // auto-scroll
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, typingFrom]);
  const sendMessage = async () => {
    if (!text.trim() || !socketRef.current) return;
    setSubmitting(true);
    const payload = {
      conversationId,
      toUserId: isAdmin? conversationId: null, // system: admin listeners; if replying admin, pass userId
      text: text.trim(),
    };
    // Emit via socket
    socketRef.current.emit("private_message", payload);
    setText("");
    setSubmitting(false);
  };
  const onTyping = (value) => {
    setText(value);
    socketRef.current?.emit("typing", { conversationId, isTyping: Boolean(value) });
  };
  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm">
      <div className="flex flex-col items-end">
        <button
          onClick={() => setIsOpen((s) => !s)}
          className="bg-primary text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 3V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="hidden sm:inline">{isAdmin ? "Talk to patient" : label}</span>
        </button>
        {isOpen && (
          <div className="mt-3 bg-white w-80 sm:w-96 rounded-xl shadow-xl border overflow-hidden">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-800">{isAdmin ? "Patients" : "Pharmacist"}</div>
                <div className="text-xs text-gray-500">{isConnected ? "Online 🟢": "Connecting..."}</div>
              </div>
              <div className="text-xs text-gray-500">{/* optionally unread count */}</div>
            </div>
            <div className="p-3 h-64 overflow-y-auto">
              <div className="space-y-3">
                {messages.map((m) => {
                  const mine = String(m.from) === String(user?._id);
                  return (
                    <div key={m._id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] px-3 py-2 rounded-lg ${mine ? "bg-primary text-white" : "bg-gray-100 text-gray-800"}`}>
                        <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                        <div className="text-xs text-gray-200 mt-1 text-right">{new Date(m.createdAt).toLocaleTimeString()}</div>
                      </div>
                    </div>
                  );
                })}
                {typingFrom && <div className="text-xs text-gray-500 italic">{typingFrom === user?._id ? "You are typing..." : "Other is typing..."}</div>}
                <div ref={bottomRef} />
              </div>
            </div>
            <div className="px-3 py-3 border-t">
              <div className="flex gap-2 items-center">
                <input
                  value={text}
                  onChange={(e) => onTyping(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
                <button onClick={sendMessage} disabled={!text.trim() || submitting} className="bg-primary text-white px-3 py-2 rounded-lg">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}