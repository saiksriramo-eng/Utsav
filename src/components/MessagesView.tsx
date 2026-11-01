import React, { useState } from 'react';
import {
  MessageSquare,
  Users,
  Search,
  Send,
  Phone,
  ChevronRight,
  Check,
  CheckCheck,
  Info
} from 'lucide-react';
import { UTSAV_CHATS, UTSAV_CREW, ChatThread } from '../constants/utsavData';
import { UtsavAIIcon } from './icons/UtsavAIIcon';

interface MessageBubble {
  id: string;
  sender: 'user' | 'other' | 'ai';
  senderName: string;
  text: string;
  time: string;
}

export const MessagesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'messages' | 'contacts'>('messages');
  const [chats, setChats] = useState<ChatThread[]>([
    {
      id: 'chat-ai',
      name: 'Utsav Sahayak AI',
      role: 'Intelligent Event Architect',
      avatar: '',
      lastMessage: 'Your 10% comfort cushion and run sheet are verified. How can I assist?',
      timestamp: 'Active Now',
      unreadCount: 0,
    },
    ...UTSAV_CHATS,
  ]);
  const [selectedChatId, setSelectedChatId] = useState<string>('chat-ai');
  const [chatMessage, setChatMessage] = useState<string>('');

  // Mock conversation history per chat
  const [conversationHistory, setConversationHistory] = useState<Record<string, MessageBubble[]>>({
    'chat-ai': [
      {
        id: 'm1',
        sender: 'ai',
        senderName: 'Utsav Sahayak',
        text: 'Namaste! All 4 pillars for Kristina & Steven are synchronized. Would you like to adjust the caterer plate count or check vendor response times?',
        time: '9:00 AM',
      },
      {
        id: 'm2',
        sender: 'user',
        senderName: 'You',
        text: 'How is the catering buffer allocated for 150 guests?',
        time: '9:05 AM',
      },
      {
        id: 'm3',
        sender: 'ai',
        senderName: 'Utsav Sahayak',
        text: 'We added +10% extra plates (165 plates total) so food never runs short, with ₹1,867 per plate ceiling reserved.',
        time: '9:06 AM',
      },
    ],
    'chat-1': [
      {
        id: 'm1',
        sender: 'other',
        senderName: 'Paige Johnson',
        text: "I'm running late. I should be there just a few minutes after our 8:00 AM call time.",
        time: '9:30 AM',
      },
    ],
    'chat-2': [
      {
        id: 'm1',
        sender: 'other',
        senderName: 'John Pettis',
        text: 'The dress is packed, and said they have a reservation number which is valid for lot parking.',
        time: '11:42 AM',
      },
    ],
  });

  const activeChat = chats.find((c) => c.id === selectedChatId) || chats[0];
  const messages = conversationHistory[selectedChatId] || [
    {
      id: 'default-1',
      sender: 'other',
      senderName: activeChat.name,
      text: activeChat.lastMessage,
      time: activeChat.timestamp,
    },
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMsg: MessageBubble = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: 'You',
      text: chatMessage.trim(),
      time: 'Just now',
    };

    setConversationHistory((prev) => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMsg],
    }));

    setChats((prev) =>
      prev.map((c) =>
        c.id === selectedChatId
          ? {
              ...c,
              lastMessage: chatMessage.trim(),
              timestamp: 'Just now',
            }
          : c
      )
    );

    // AI automated reply if chatting with AI
    if (selectedChatId === 'chat-ai') {
      setTimeout(() => {
        const aiReply: MessageBubble = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          senderName: 'Utsav Sahayak',
          text: `Understood! I've logged your request regarding: "${chatMessage.trim()}". The command center state is balanced.`,
          time: 'Just now',
        };
        setConversationHistory((prev) => ({
          ...prev,
          'chat-ai': [...(prev['chat-ai'] || []), aiReply],
        }));
      }, 1000);
    }

    setChatMessage('');
  };

  return (
    <div className="pb-24 lg:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =========================================================================
            LEFT COLUMN (lg:col-span-5): CHATS & CONTACTS LIST
           ========================================================================= */}
        <div className="lg:col-span-5 space-y-3">
          {/* Folder-Tab Switcher at Top */}
          <div className="flex items-center rounded-card bg-cream-200/70 p-1 border border-black/[0.04]">
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-subcard text-[13px] font-semibold transition-all ${
                activeTab === 'messages'
                  ? 'bg-sageTeal text-white shadow-ambient-sm'
                  : 'text-charcoal hover:bg-white/40'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-subcard text-[13px] font-semibold transition-all ${
                activeTab === 'contacts'
                  ? 'bg-white text-charcoal shadow-ambient-sm'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Contacts</span>
            </button>
          </div>

          {/* Messages Tab List */}
          {activeTab === 'messages' && (
            <div className="space-y-2">
              {chats.map((chat) => {
                const isSelected = chat.id === selectedChatId;
                const isAI = chat.id === 'chat-ai';

                return (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    className={`p-3.5 rounded-card transition-all cursor-pointer border select-none ${
                      isSelected
                        ? 'bg-slateNavy text-white border-transparent shadow-ambient-md'
                        : 'bg-white text-charcoal border-black/[0.05] shadow-ambient hover:bg-cream-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        {isAI ? (
                          <div className="w-11 h-11 rounded-full bg-sageTeal text-white flex items-center justify-center shadow-ambient-sm">
                            <UtsavAIIcon className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <img
                            src={chat.avatar}
                            alt={chat.name}
                            className="w-11 h-11 rounded-full object-cover border border-black/[0.06]"
                          />
                        )}
                        {chat.unreadCount > 0 && !isSelected && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-coralAccent text-white text-[10px] font-bold flex items-center justify-center">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-semibold text-[14px] truncate flex items-center gap-1.5 ${isSelected ? 'text-white' : 'text-charcoal'}`}>
                            <span>{chat.name}</span>
                            {isAI && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sageTeal/20 text-sageTeal font-bold">
                                AI
                              </span>
                            )}
                          </h4>
                          <span className={`text-[11px] ${isSelected ? 'text-white/70' : 'text-charcoal-muted'}`}>
                            {chat.timestamp}
                          </span>
                        </div>

                        <p className={`text-[12px] leading-snug mt-1 line-clamp-2 ${isSelected ? 'text-white/85' : 'text-charcoal-muted'}`}>
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Contacts Tab List */}
          {activeTab === 'contacts' && (
            <div className="space-y-2.5">
              <div className="relative mb-2">
                <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search contacts by name or role..."
                  className="w-full bg-white border border-black/[0.06] rounded-card pl-10 pr-4 py-2.5 text-[13px] text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:ring-1 focus:ring-sageTeal shadow-ambient"
                />
              </div>

              {UTSAV_CREW.map((crew) => (
                <div
                  key={crew.id}
                  className="p-3.5 rounded-card bg-white border border-black/[0.05] shadow-ambient flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={crew.avatar}
                      alt={crew.name}
                      className="w-11 h-11 rounded-full object-cover border border-black/[0.06]"
                    />
                    <div>
                      <h4 className="font-semibold text-[14px] text-charcoal">
                        {crew.name}
                      </h4>
                      <p className="text-[12px] text-charcoal-muted">
                        {crew.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:5551234567`}
                      className="p-2 rounded-full bg-cream-100 text-charcoal hover:bg-cream-200 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="p-2 rounded-full bg-sageTeal/15 text-sageTeal hover:bg-sageTeal/25 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* =========================================================================
            RIGHT COLUMN (lg:col-span-7): ACTIVE CONVERSATION PANE
           ========================================================================= */}
        <div className="lg:col-span-7 bg-white rounded-card border border-black/[0.05] shadow-ambient overflow-hidden flex flex-col min-h-[480px] lg:h-[620px]">
          {/* Active Conversation Header */}
          <div className="p-4 border-b border-black/[0.05] flex items-center justify-between bg-cream-50/60">
            <div className="flex items-center gap-3">
              {activeChat.id === 'chat-ai' ? (
                <div className="w-10 h-10 rounded-full bg-sageTeal text-white flex items-center justify-center shadow-ambient-sm">
                  <UtsavAIIcon className="w-5 h-5 text-white" />
                </div>
              ) : (
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="w-10 h-10 rounded-full object-cover border border-black/[0.08]"
                />
              )}
              <div>
                <h3 className="font-semibold text-[15px] text-charcoal leading-tight">
                  {activeChat.name}
                </h3>
                <span className="text-[11px] text-charcoal-muted block">
                  {activeChat.role}
                </span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-sageTeal/15 text-sageTeal text-[11px] font-semibold">
              Live Chat Connected
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-cream-50/20">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isAI = msg.sender === 'ai';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-charcoal-muted">
                    {isAI && <UtsavAIIcon className="w-3 h-3 text-sageTeal inline" />}
                    <span>{msg.senderName}</span>
                    <span>•</span>
                    <span>{msg.time}</span>
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-[18px] px-4 py-2.5 text-[13px] leading-relaxed shadow-ambient-sm ${
                      isUser
                        ? 'bg-sageTeal text-white rounded-tr-none'
                        : isAI
                        ? 'bg-slateNavy text-white rounded-tl-none'
                        : 'bg-white border border-black/[0.06] text-charcoal rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 sm:p-4 border-t border-black/[0.05] bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Message ${activeChat.name}...`}
                className="flex-1 bg-cream-50 border border-black/[0.06] rounded-full px-4 py-2.5 text-[13px] text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:ring-1 focus:ring-sageTeal"
              />
              <button
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
                className="w-10 h-10 rounded-full bg-sageTeal text-white flex items-center justify-center hover:bg-sageTeal-dark transition-colors disabled:opacity-40 shrink-0 shadow-ambient-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesView;
