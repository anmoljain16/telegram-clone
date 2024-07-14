import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TelegramClone = () => {
    const [chats, setChats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1');
                if (response.data && Array.isArray(response.data.data.data)) {
                    setChats(response.data.data.data);
                } else {
                    throw new Error('Invalid chat data');
                }
            } catch (error) {
                setError('Error fetching chats');
                console.error('Error fetching chats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedChatId) return;
            try {
                const response = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${selectedChatId}`);
                setMessages(response.data.data || []);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [selectedChatId]);

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

    return (
        <div className="flex h-screen bg-[#F9F9F9]">
            {/* Chat List */}
            <div className="w-1/4 border-r border-gray-200 overflow-y-auto">
                <div className="p-4 bg-[#03527E] text-white">
                    <h1 className="text-2xl font-bold">Chats</h1>
                </div>
                {chats.map(chat => (
                    <div
                        key={chat.id}
                        className={`p-4 cursor-pointer hover:bg-[#03699F] ${selectedChatId === chat.id ? 'bg-[#03527E] text-white' : ''}`}
                        onClick={() => setSelectedChatId(chat.id)}
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#03527E] rounded-full"></div>
                            <div>
                                <h3 className="font-semibold">{chat.creator.name || "Unknown"}</h3>
                                <p className="text-sm text-gray-600">Messages: {chat.msg_count}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
                {selectedChatId ? (
                    <>
                        <div className="p-4 bg-[#03527E] text-white">
                            <h2 className="text-xl font-bold">
                                {chats.find(chat => chat.id === selectedChatId)?.creator.name || "Chat"}
                            </h2>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map(message => (
                                <div
                                    key={message.id}
                                    className={`p-2 rounded-lg max-w-[70%] ${
                                        message.sender_id === 1
                                            ? 'bg-[#03699F] text-white self-end ml-auto'
                                            : 'bg-gray-200 text-black'
                                    }`}
                                >
                                    <div className="font-bold">{message.sender.name}</div>
                                    <div>{message.message}</div>
                                    <div className="text-xs opacity-75">
                                        {new Date(message.created_at).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-white border-t border-gray-200">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#03527E]"
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        Select a chat to start messaging
                    </div>
                )}
            </div>
        </div>
    );
};

export default TelegramClone;
