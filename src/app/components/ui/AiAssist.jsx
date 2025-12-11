"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Send, Clock, MessageSquare, Loader2,ChevronDown } from "lucide-react";
import Head from "next/head";
// Assuming these are custom components you have
import ShinyText from "@/components/ui/ShinyText";
import SplitText from "@/components/ui/SplitText";

// 🌟 MARKDOWN IMPORTS 🌟
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// ----------------------

// --- CONSTANTS ---
const ASHMEET_CHAT_API_URL = `https://chat-with-me-seven-sandy.vercel.app/api/chat`;
const ASHMEET_ASSISTANT_IMAGE_URL = "/avatar.png";
const ASHMEET_USER_IMAGE_URL = "https://placehold.co/40x40/60a5fa/ffffff?text=U";
const ASHMEET_ASSISTANT_NAME = "TQ assistant";
const ASHMEET_MAX_INPUT_WORDS = 500;
const TYPING_INDICATOR_MESSAGE_ID = "typing-indicator"; // Fixed ID for typing indicator
const ANIMATION_INTERVAL = 5000; // 5 seconds for SplitText re-animation

// --- UTILITY FUNCTIONS ---
const getAshmeetWordCount = (text) => {
  if (!text) return 0;
  const words = String(text).trim().split(/\s+/).filter(Boolean);
  return words.length;
};

const formatAshmeetTime = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime()))
    return "Time N/A";
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const generateAshmeetId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2, 9); // Shorter, more robust ID

const ashmeetInitialMessages = [
  {
    id: generateAshmeetId(),
    text: `Hello, I'm **${ASHMEET_ASSISTANT_NAME}**. I'm an advanced AI designed to assist you with deep insights. Please **ask me about our work, professional background,pricing,plans, current market trends.**`,
    isBot: true,
    timestamp: new Date(),
  },
];

// =========================================================================
// NEW: JUMPING DOTS TYPING INDICATOR (AshmeetTypingIndicator)
// =========================================================================
const AshmeetTypingIndicator = ({ assistantImageUrl }) => {
  return (
    <div 
      className="relative z-10 flex w-full my-2 justify-start"
      role="status" 
      aria-label={`${ASHMEET_ASSISTANT_NAME} is typing`} 
    >
      <div className="relative max-w-[60%] rounded-xl rounded-tl-md bg-gray-100 dark:bg-neutral-800 p-2 pl-10 shadow-lg flex items-center h-10">
        
        {/* Avatar Wrapper - Copied from AshmeetChatMessage */}
        <div
          className="absolute left-1 top-1 w-8 h-8"
          title={ASHMEET_ASSISTANT_NAME}
        >
          <div className="relative w-full h-full">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={assistantImageUrl}
                alt="Bot Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/40x40/000000/ffffff?text=AS";
                }}
              />
            </div>
            {/* Online Dot */}
            <div
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 `}
              title="Online"
            />
          </div>
        </div>

        {/* Jumping Dots Container */}
        <div className="flex space-x-1.5 items-end ml-3.5 pt-1">
          {/* Dot 1 */}
          <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          {/* Dot 2 */}
          <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          {/* Dot 3 */}
          <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};
// =========================================================================


// =========================================================================
// 1. MESSAGE COMPONENT (AshmeetChatMessage) - OPTIMIZED FOR RENDERING
// =========================================================================
const AshmeetChatMessage = React.memo(({
  message,
  isBot,
  isAssistantOnline,
  assistantImageUrl,
  userImageUrl,
}) => {
  const text = message?.text || "";
  const timestamp = message?.timestamp;

  // --- STYLING FOR CHAT BUBBLES ---
  const botAvatarClasses = "w-full h-full rounded-full overflow-hidden";
  const botBubbleClasses = "bg-gray-100 text-gray-800 p-1 pl-10 rounded-xl rounded-tl-[50px] shadow-lg text-sm dark:bg-neutral-800 dark:text-gray-100";
  const userAvatarClasses = "w-full h-full rounded-full overflow-hidden";
  const userBubbleClasses = "bg-[#076971ff] text-white p-2 pr-10 rounded-xl rounded-tr-[50px] shadow-lg";

  const AvatarWrapper = ({ imageUrl, name, isBot, isOnline }) => (
    <div
      className={`absolute top-1 w-8 h-8 ${isBot ? "left-1" : "right-1"}`}
      title={name}
    >
      <div className="relative w-full h-full">
        <div className={isBot ? botAvatarClasses : userAvatarClasses}>
          <img
            src={imageUrl}
            alt={`${name} Avatar`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = isBot
                ? "https://placehold.co/40x40/000000/ffffff?text=AS"
                : "https://placehold.co/40x40/60a5fa/ffffff?text=U";
            }}
          />
        </div>
        <div
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ${
            isBot
              ? isOnline
                ? "bg-green-500 ring-white"
                : "bg-red-500 ring-white"
              : "bg-green-400"
          }`}
          title={isBot ? (isOnline ? "Online" : "Offline") : "Active"}
        />
      </div>
    </div>
  );

  const markdownComponents = useMemo(() => ({
    div: ({ node, ...props }) => <div {...props} className="mb-1" />, 
    a: ({ node, ...props }) => (
      <a
        {...props}
        className={`underline transition duration-200 ${
          isBot
            ? "text-blue-400 hover:text-blue-500"
            : "text-blue-200 hover:text-blue-50"
        }`}
      />
    ),
    p: ({ node, ...props }) => <p {...props} className="mb-1" />, 
    h1: ({ node, ...props }) => (
      <h1
        {...props}
        className={`text-md font-bold mt-3 mb-1 ${
          isBot ? "text-gray-100" : "text-white"
        }`}
      />
    ),
    h2: ({ node, ...props }) => (
      <h2
        {...props}
        className={`text-base font-semibold mt-2 mb-1 ${
          isBot ? "text-gray-200" : "text-white"
        }`}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        {...props}
        className={`text-sm font-semibold mt-1 mb-0.5 ${
          isBot ? "text-gray-300" : "text-blue-100"
        }`}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul
        {...props}
        className="list-disc list-inside ml-2 my-1 space-y-0.5"
      />
    ),
    ol: ({ node, ...props }) => (
      <ol
        {...props}
        className="list-decimal list-inside ml-2 my-1 space-y-0.5"
      />
    ),
    li: ({ node, ...props }) => <li {...props} className="mt-0.5" />,
    code: ({ node, inline, ...props }) => {
      if (inline) {
        return (
          <code
            {...props}
            className={`px-1 py-0.5 rounded ${
              isBot
                ? "bg-gray-700 text-red-400 font-mono text-sm"
                : "bg-blue-700 text-yellow-300 font-mono text-sm"
            }`}
          />
        );
      }
      return (
        <pre
          className={`p-2 rounded-lg mt-2 mb-1 overflow-x-auto text-xs ${
            isBot
              ? "bg-gray-700 border border-gray-600"
              : "bg-blue-700 border border-blue-800"
          }`}
        >
          <code
            {...props}
            className={`text-xs ${
              isBot
                ? "text-gray-100"
                : "text-white"
            }`}
          />
        </pre>
      );
    },
    blockquote: ({ node, ...props }) => (
      <blockquote
        {...props}
        className={`border-l-4 pl-3 py-1 italic mt-2 mb-1 ${
          isBot
            ? "border-gray-500 text-gray-300"
            : "border-blue-300 text-blue-100"
        }`}
      />
    ),
    table: ({ node, ...props }) => (
      <table
        {...props}
        className={`min-w-full divide-y divide-gray-600 my-2 text-sm ${
          isBot ? "text-gray-200" : "text-white"
        }`}
      />
    ),
    thead: ({ node, ...props }) => (
      <thead
        {...props}
        className={`${
          isBot ? "bg-gray-700" : "bg-blue-700"
        }`}
      />
    ),
    th: ({ node, ...props }) => (
      <th
        {...props}
        className={`px-2 py-1 text-left font-semibold ${
          isBot ? "text-gray-100" : "text-white"
        }`}
      />
    ),
    td: ({ node, ...props }) => (
      <td
        {...props}
        className={`px-2 py-1 whitespace-normal border-t ${
          isBot
            ? "border-gray-600"
            : "border-blue-700"
        }`}
      />
    ),
  }), [isBot]);


  return (
    <div
      className={`relative z-10 flex w-full my-2 ${
        isBot ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`relative max-w-[70%] transition-all duration-300 ${
          isBot ? botBubbleClasses : userBubbleClasses
        }`}
      >
        {isBot && (
          <AvatarWrapper
            imageUrl={assistantImageUrl}
            name={ASHMEET_ASSISTANT_NAME}
            isBot={true}
            isOnline={isAssistantOnline}
          />
        )}

        <div className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {String(text).trim()} 
          </ReactMarkdown>
        </div>

        <div
          className={`flex items-center mt-1 text-xs opacity-75 ${
            isBot
              ? "justify-end text-gray-400"
              : "justify-start text-white/70"
          }`}
        >
          <Clock
            className={`w-2 h-2 mr-1 ${
              isBot ? "text-gray-400" : "text-white/70"
            }`}
          />
          <span
            className={`${
              isBot ? "text-gray-400" : "text-white/70"
            }`}
          >
            {formatAshmeetTime(timestamp)}
          </span>
        </div>

        {!isBot && (
          <AvatarWrapper
            imageUrl={userImageUrl}
            name={"You"}
            isBot={false}
            isOnline={true}
          />
        )}
      </div>
    </div>
  );
});

AshmeetChatMessage.displayName = 'AshmeetChatMessage';

// =========================================================================
// 2. CORE CHATBOT LOGIC & INTERFACE (AshmeetChatInterface)
// =========================================================================

const AshmeetChatInterface = ({ onClose }) => { 
  const [messages, setMessages] = useState(ashmeetInitialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); 
  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null);

  const wordCount = getAshmeetWordCount(input);
  const isInputTooLong = wordCount > ASHMEET_MAX_INPUT_WORDS;
  const isAssistantOnline = true;

  const latestMessagesRef = useRef(messages);
  useEffect(() => {
    latestMessagesRef.current = messages;
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);
  
  const autoResizeTextarea = useCallback(() => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; 
      const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 24;
      const maxHeight = lineHeight * 5; 
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
    autoResizeTextarea();
  }, [messages, autoResizeTextarea, scrollToBottom]); 
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((prevKey) => prevKey + 1);
    }, ANIMATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const callAshmeetApiWithBackoff = async (payload) => {
    const MAX_RETRIES = 5;
    let delay = 1000;

    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        const response = await fetch(ASHMEET_CHAT_API_URL, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorBody = await response.text().catch(() => "N/A");
          console.error(`API Error Response (${response.status}):`, errorBody);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error(
          `API call failed (Attempt ${i + 1}/${MAX_RETRIES}):`,
          error.message
        );
        if (i === MAX_RETRIES - 1) {
          throw new Error("Maximum retries reached. Failed to get a response.");
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; 
      }
    }
  };

  const handleAshmeetSend = async (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading || isInputTooLong) return;

    const userMessage = {
      id: generateAshmeetId(),
      text: trimmedInput,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    setTimeout(() => {
        scrollToBottom();
        autoResizeTextarea();
    }, 50);

    const payload = {
      query: trimmedInput, 
    };

    try {
      const result = await callAshmeetApiWithBackoff(payload);

      const botResponse =
        result?.reply ||
        "Sorry, I couldn't process that request. The API responded, but the expected 'reply' field was missing or invalid.";

      setMessages((prev) => [
        ...prev,
        {
          id: generateAshmeetId(),
          text: botResponse,
          isBot: true,
          timestamp: new Date(),
        },
      ]);
      textAreaRef.current?.focus();
    } catch (error) {
      console.error("Error communicating with API:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: generateAshmeetId(),
          text: "Connection error: Failed to reach the AI. Please check the network connection and try again.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAshmeetInputChange = (e) => {
    const value = e.target.value;
    const potentialWordCount = getAshmeetWordCount(value);
    
    let newValue = value;

    if (potentialWordCount > ASHMEET_MAX_INPUT_WORDS) {
      const words = value.trim().split(/\s+/).filter(Boolean);
      const limitedWords = words.slice(0, ASHMEET_MAX_INPUT_WORDS);
      newValue = limitedWords.join(" ");
    }
    
    setInput(newValue);
    autoResizeTextarea();
  };

  const statusText = isAssistantOnline ? "Online" : "Offline";
  const statusColorClasses = isAssistantOnline
    ? "text-green-500"
    : "text-red-500";

  return (
    <>
      <div className="flex flex-col h-full antialiased pb-4 md:pb-0"> 
        {/* HEADER */}
        <header className="sticky top-0 z-50 flex items-center justify-between py-4 px-3 bg-black backdrop-blur-md transition duration-300">
          <div className="flex items-center space-x-2 pl-1">
            <div className="relative">
              <img
                src={ASHMEET_ASSISTANT_IMAGE_URL}
                alt="Assistant Avatar"
                className="w-7 h-7 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/40x40/000000/ffffff?text=AS";
                }}
              />
              {/* Online Dot */}
              <div
                className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${
                  isAssistantOnline ? "bg-green-500" : "bg-red-500"
                }`}
                title={isAssistantOnline ? "Online" : "Offline"}
              />
            </div>

            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-gray-100 leading-tight">
                {ASHMEET_ASSISTANT_NAME}
              </h3>
              <p className={`text-xs ${statusColorClasses}`}>
                <SplitText
                  text={statusText}
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                  key={animationKey} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                />
              </p>
            </div>
          </div>

          <div className="flex space-x-0.5">
            <button
              onClick={onClose}
              className="p-1 rounded-sm text-white hover:bg-cyan-900 transition" 
              title="Close Chat"
              aria-label="Close Chatbot Window" 
            >
              <span className="sr-only">Close Chat</span>
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Message Display Area */}
        <div className="flex-grow flex flex-col min-h-0 overflow-hidden bg-transparent transition duration-300">
          <div className="flex-grow p-3 space-y-4 overflow-y-auto injected-scrollbar">
            {messages.map((msg) => (
              <AshmeetChatMessage
                key={msg.id}
                message={msg}
                isBot={msg.isBot}
                isAssistantOnline={isAssistantOnline}
                assistantImageUrl={ASHMEET_ASSISTANT_IMAGE_URL}
                userImageUrl={ASHMEET_USER_IMAGE_URL}
              />
            ))}

            {/* Typing Indicator - Using the new AshmeetTypingIndicator component */}
            {isLoading && (
              <AshmeetTypingIndicator 
                assistantImageUrl={ASHMEET_ASSISTANT_IMAGE_URL} 
              />
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form (FOOTER) */}
        <form
          onSubmit={handleAshmeetSend}
          className="sticky bottom-0 z-50 p-1 mx-3 bg-transparent  backdrop-blur-none transition duration-300 pb-10 md:mb-0 md:pb-1"
        >
          {/* Input Container */}
          <div
            className={`relative flex items-center border-t-2 border-l-2 border-r-2 space-x-2 bg-white p-1 rounded-sm shadow-lg ${
              isInputTooLong ? "border-2 border-cyan-500" : "border-gray-800"
            }`}
          >
            {/* Controlled textarea with auto-resize logic */}
            <textarea
                ref={textAreaRef}
                rows={1}
                value={input}
                onChange={handleAshmeetInputChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAshmeetSend(e);
                    }
                }}
                placeholder="Ask me about my work..."
                className="flex-grow py-1.5 px-3 border-none focus:outline-none bg-transparent text-black transition duration-150 rounded-lg resize-none overflow-y-hidden"
                disabled={isLoading}
                aria-label="Chat input" 
            />

            {/* Send Button */}
            <button
              type="submit"
              className={`ashmeet-wow-send-button p-1 rounded-xl transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-8 h-8 flex-shrink-0`}
              disabled={!input.trim() || isLoading || isInputTooLong}
              title="Send Message"
              aria-label="Send Message" 
            > 
              <ShinyText
                text={
                  <Send className="w-4 h-4 text-black transform -translate-x-px" />
                }
                disabled={!input.trim() || isLoading || isInputTooLong}
                speed={3}
                className="!bg-transparent text-white"
              />
            </button>
          </div>
          {/* Word Count Indicator */}
          <div className="flex justify-end pt-1 text-xs text-gray-400"> 
            <span>
              {wordCount}/{ASHMEET_MAX_INPUT_WORDS} 
            </span>
            {isInputTooLong && <span className="ml-1 text-cyan-500">(Max Limit Reached)</span>}
          </div>
        </form>
      </div>
    </>
  );
};

// =========================================================================
// 3. MAIN EXPORTED COMPONENT (AshmeetChatbotWidget)
// =========================================================================

export default function AshmeetChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    setMounted(true); 
  }, []); 
  
  // 🆕 NEW: Styling for the notification blob (visible when chat is closed)
  const notificationBlobClasses = useMemo(() => 
    isOpen ? 
      "opacity-0 scale-0" : 
      "opacity-100 scale-100 bg-cyan-500 absolute top-0 right-0 transition-all duration-300 transform origin-center"
  , [isOpen]);


  const modalClasses = useMemo(() => {
      const isVisible = isOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none";

      const mobileSlide = isOpen ? "translate-x-0" : "translate-x-full";
      const desktopSlide = isOpen ? "md:translate-y-0" : "md:translate-y-full";

      return `
        fixed z-[99] transition-all duration-500 ease-in-out
        bg-black backdrop-blur-xl flex flex-col overflow-hidden
        ${isVisible}
        inset-0 w-full h-screen rounded-none
        ${mobileSlide}
        
        md:inset-auto md:bottom-0 md:right-4 md:w-full md:max-w-lg md:h-[550px] md:rounded-t-xl sm:rounded-none md:translate-x-0
        ${desktopSlide}
      `;
  }, [isOpen]);


  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`bg-white transition-colors duration-500 font-inter ${
        isOpen ? "overflow-hidden" : ""
      }`}
    >
      <Head>
        <title>Ashmeet's Chatbot</title>
      </Head>

      {/* 🆕 NEW FAB TRIGGER BUTTON */}
      <button
        onClick={toggleChat}
        className={`
          fixed z-50 bottom-4 right-4 
          w-14 h-14 rounded-full shadow-2xl 
          flex items-center justify-center 
          transition-all duration-300 ease-in-out 
          hover:scale-[1.05] focus:outline-none 
          ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100 cursor-pointer"}
        `}
        title="Open Singh AI Chat"
        aria-label="Open Chatbot Widget"
      >
        <div className="relative w-full h-full">
            {/* Assistant Image */}
            <img
                src={ASHMEET_ASSISTANT_IMAGE_URL}
                alt="AI Assistant Avatar"
                className="w-full h-full object-cover rounded-full p-0.5 border-2 border-white/50 "
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/40x40/000000/ffffff?text=AS";
                }}
            />

            {/* Notification Blob */}
            <div
                className={`w-3 h-3 rounded-full ${notificationBlobClasses}`}
            >
            </div>
        </div>
      </button>

      {/* The Sliding Modal Container */}
      <div className={modalClasses}>

        {/* Main Chat Interface (Higher Z-Index) */}
        <div className="relative z-10 w-full h-full">
          <AshmeetChatInterface onClose={toggleChat} /> 
        </div>
      </div>
    </div>
  );
}