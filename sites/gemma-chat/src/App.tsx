import React from 'react';
import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import { AppShell, Heading, Text, Button, TextInput, Avatar } from '@astryxdesign/core';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  { id: 1, sender: 'bot', text: "Hello! Welcome to the Astryx Chat Demo. How can I assist you today?", timestamp: "9:00 AM" },
  { id: 2, sender: 'user', text: "Hi there! I need help understanding responsive design principles.", timestamp: "9:01 AM" },
  { id: 3, sender: 'bot', text: "I'd be happy to help! Astryx components are designed with responsiveness in mind.", timestamp: "9:02 AM" },
];

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `Got your message about "${newMessage.text}". That's a great topic!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  return (
    <AppShell className="flex flex-col h-full w-full bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Header */}
      <header className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-3">
          <Avatar src="https://via.placeholder.com/50" alt="Contact" className="w-12 h-12" />
          <div>
            <Heading level={2} className="text-lg font-semibold text-gray-800">Astryx Support</Heading>
            <Text className="text-sm text-green-600">Online - Available 24/7</Text>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div role="log" aria-live="polite" className="flex-grow overflow-y-auto p-4 space-y-2 pb-20">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <Avatar src="https://via.placeholder.com/40" alt="Bot" className="w-10 h-10 mr-3 flex-shrink-0 mt-1" />
              )}
              <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} w-full`}>
                <div className={`p-3 rounded-xl max-w-[80%] ${isUser ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-900 rounded-tl-none'}`}>
                  <Text>{msg.text}</Text>
                </div>
                <div className={`mt-1 text-xs ${isUser ? 'text-right' : 'text-left'} text-gray-500`}>
                  {msg.timestamp}
                </div>
              </div>
              {isUser && (
                <Avatar src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 ml-3 flex-shrink-0 mt-1" />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <footer className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSend} className="flex items-end space-x-3">
          <div className="flex-grow">
            <TextInput
              label="Message"
              value={input}
              onChange={(v) => setInput(v)}
              placeholder="Type your message..."
              className="w-full"
              aria-label="Message input field"
            />
          </div>
          <Button label="Send" type="submit" className="h-[56px] w-[56px] flex items-center justify-center">
            ➤
          </Button>
        </form>
      </footer>
    </AppShell>
  );
};

const App: React.FC = () => {
  return (
    <Theme theme={neutralTheme}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-start p-4 sm:p-8">
        <div className="w-full max-w-xl lg:max-w-3xl h-[calc(100vh-2rem)]">
          <ChatWindow />
        </div>
      </div>
    </Theme>
  );
};

export default App;