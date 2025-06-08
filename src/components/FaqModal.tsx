import { useState } from 'react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqModal = ({ isOpen, onClose }: FaqModalProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const faqs: FaqItem[] = [
    {
      question: 'What is the Command Palette?',
      answer: 'The Command Palette is a powerful tool that lets you quickly access various features and commands in the app. Press Cmd+P (Mac) or Ctrl+P (Windows/Linux) to open it.',
    },
    {
      question: 'How do I use keyboard shortcuts?',
      answer: 'Most commands can be accessed through the Command Palette. Common shortcuts include Cmd/Ctrl+P to open the palette, Esc to close it, and arrow keys to navigate.',
    },
    {
      question: 'How do I customize the theme?',
      answer: 'You can use the Command Palette to switch between light and dark themes. Type "darkmode" or "lightmode" to change the theme, or use the theme toggle in the top-right corner.',
    },
    {
      question: 'How do I hide/show the navigation?',
      answer: 'Use the Command Palette and type "hide-nav" or "show-nav" to toggle the navigation sidebar.',
    },
    {
      question: 'What are the stress relief tools?',
      answer: 'The app includes several stress relief tools like the Breathing Exercise Timer and Digital Zen Garden. Type "games" in the Command Palette to see all available tools.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold dark:text-white">FAQ & Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <button
                className="flex w-full items-center justify-between p-4 text-left"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-medium dark:text-white">{faq.question}</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              {activeIndex === index && (
                <div className="border-t border-gray-200 p-4 dark:border-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 