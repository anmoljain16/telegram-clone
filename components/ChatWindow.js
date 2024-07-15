// ChatWindow.js
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

const ChatWindow = ({ chatId, darkMode, creator, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newMessage, setNewMessage] = useState('');
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

    const handleSendMessage = () => {
        // Add functionality to send a message
        setMessages([...messages, { id: Date.now(), message: newMessage, sender: { name: 'You' }, created_at: new Date().toISOString(), sender_id: 1 }]);
        setNewMessage('');
    };

    if (loading) {
        return <div className={`p-4 max-[400px]:hidden ${darkMode ? 'text-telegram-dark-fg-main' : 'text-telegram-fg-main'}`}>Loading messages...</div>;
    }

    if (error) {
        return <div className={`p-4 ${darkMode ? 'text-telegram-fg-bad' : 'text-telegram-fg-bad'}`}>{error}</div>;
    }

    return (
        <div ref={chatContainerRef} className={`flex flex-col h-screen max-[400px]:absolute  ${darkMode ? 'bg-slate-900' : 'bg-gray-50'} flex-1 inset-0 z-10 transform ${chatId ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out`}>
            <div className={`sticky top-0 mb-2 bg-inherit z-20 flex items-center justify-between p-4 border-b-1 border-black ${darkMode ? 'bg-slate-700' : 'bg-telegram-bg-main'}`}>
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
            <div className={`flex flex-col space-y-4 px-2 flex-1 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}
             overflow-y-auto overflow-x-clip [&::-webkit-scrollbar]:[width:4px] [&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full`} >
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
            <div className={`sticky bottom-0 p-4 ${darkMode ? '' : 'bg-gray-100'} flex items-center`}>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    InputProps={{
                        style: {
                            backgroundColor: darkMode ? '#232e3b' : '#fff',
                            color: darkMode ? '#fff' : '#000',
                            borderRadius: '25px',
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                    }}
                />
                <IconButton color="primary" onClick={handleSendMessage}>
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default ChatWindow;
