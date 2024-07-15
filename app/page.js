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

    const onBack = () => setSelectedChatId(null);

    return (
        <div className={`flex flex-row max-[400px]:flex-col h-screen ${darkMode ? 'dark' : ''}`}>
            <div className={`flex items-start justify-between border-b ${darkMode ? 'bg-slate-800 text-white border-gray-700' : 'bg-slate-700 text-slate-400 border-gray-300'}`} >
                <button className="m-4" onClick={toggleDrawer}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="12" x2="20" y2="12"></line>
                        <line x1="7" y1="7" x2="20" y2="7"></line>
                        <line x1="7" y1="2" x2="20" y2="2"></line>
                    </svg>
                </button>
                <div className="sm:hidden"></div>
            </div>
            <div className="flex flex-1  overflow-hidden">
                <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} onToggleDarkMode={toggleDarkMode}
                        darkMode={darkMode}/>

                <ChatList onSelectChat={setSelectedChatId} darkMode={darkMode}/>
                {selectedChatId ? (
                    <ChatWindow chatId={selectedChatId.chatid} creator={selectedChatId.creator} darkMode={darkMode} onBack={onBack}/>


                ) : (
                    <div
                        className={`flex-1 max-[400px]:hidden flex items-center justify-center ${darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-telegram-bg-main text-white border-gray-300'}`}>
                        <span className={` ${darkMode ? 'bg-slate-800' : 'bg-slate-700 opacity-90'} rounded-3xl  p-2 border-2`}>Select a chat to start messaging</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
