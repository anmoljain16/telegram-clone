import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const ChatWindow = ({ chatId, darkMode, creator, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`);
                setMessages(response.data.data || []);
            } catch (error) {
                setError('Error fetching messages');
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [chatId]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    if (loading) {
        return <div className={`p-4 ${darkMode ? 'text-telegram-dark-fg-main' : 'text-telegram-fg-main'}`}>Loading messages...</div>;
    }

    if (error) {
        return <div className={`p-4 ${darkMode ? 'text-telegram-fg-bad' : 'text-telegram-fg-bad'}`}>{error}</div>;
    }

    return (
        <div ref={chatContainerRef} className={`flex-1 p-4 overflow-y-auto h-screen ${darkMode ? 'bg-telegram-dark-bg-main' : 'bg-telegram-bg-main'}`}>
            <div className="sticky top-0 bg-opacity-90 bg-inherit z-10 flex items-center justify-between p-4 border-b-2 border-black/75">
                <button onClick={onBack} className="sm:hidden">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-telegram-dark-fg-main' : 'text-telegram-fg-main'}`}>
                    {creator.name ? creator.name : "Unknown"}
                </h2>
                <div className="sm:hidden"></div>
            </div>
            <div className="flex flex-col space-y-4 mb-24">
                {messages.map(message => (
                    <div key={message.id} className={`p-2 rounded-lg max-w-[70%] ${
                        message.sender_id === 1
                            ? darkMode ? 'bg-telegram-dark-highlight text-telegram-dark-fg-main self-end' : 'bg-telegram-highlight text-white self-end'
                            : darkMode ? 'bg-telegram-dark-bg-secondary text-telegram-dark-fg-main' : 'bg-gray-300 text-telegram-chat-text'
                    }`}>
                        <div className="font-bold">{message.sender.name}</div>
                        <div>{message.message}</div>
                        <div className={`text-xs ${darkMode ? 'text-telegram-dark-fg-secondary' : 'text-telegram-chat-date'}`}>
                            {new Date(message.created_at).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatWindow;
