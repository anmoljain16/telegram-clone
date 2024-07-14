// pages/page.js
"use client"
import { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import Drawer from '../components/Drawer';

const Home = () => {
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
            <div className="flex flex-1 overflow-hidden">
                <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} onToggleDarkMode={toggleDarkMode} darkMode={darkMode} />
                <button className=" m-4" onClick={toggleDrawer}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="10" x2="17" y2="10"></line>
                        <line x1="7" y1="6" x2="17" y2="6"></line>
                        <line x1="7" y1="2" x2="17" y2="2"></line>

                    </svg>

                </button>
                <ChatList onSelectChat={setSelectedChatId} darkMode={darkMode}/>
                {selectedChatId ? (
                    <ChatWindow chatId={selectedChatId.chatid} creator={selectedChatId.creator} darkMode={darkMode}/>
                ) : (
                    <div className={`flex-1 flex items-center justify-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Select a chat to start messaging
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
