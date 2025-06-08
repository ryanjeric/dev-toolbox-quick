import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useFavorites } from '../hooks/useFavorites';
import { useRandomTool } from '../hooks/useRandomTool';
import { useRelaxMode } from '../hooks/useRelaxMode';
import { useNavigation } from '../hooks/useNavigation';
import Fuse from 'fuse.js';
import { toast } from 'sonner';
import { FaqModal } from './FaqModal';

interface Command {
  id: string;
  name: string;
  description: string;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showFaq, setShowFaq] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();
  const { toggleFavoritesOnly, showOnlyFavorites } = useFavorites();
  const { openRandomTool } = useRandomTool();
  const { openRandomRelaxTool } = useRelaxMode();
  const { showNavigation, hideNavigation } = useNavigation();

  const commands: Command[] = [
    {
      id: 'hide-nav',
      name: 'Hide Navigation',
      description: 'Hides the side navigation',
      action: () => {
        hideNavigation();
        onClose();
      },
    },
    {
      id: 'show-nav',
      name: 'Show Navigation',
      description: 'Shows the side navigation',
      action: () => {
        showNavigation();
        onClose();
      },
    },
    {
      id: 'destroy',
      name: 'Destroy UI',
      description: 'Randomizes the UI layout for fun',
      action: () => {
        const elements = document.querySelectorAll('*');
        elements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
            el.style.transition = 'all 0.3s ease';
          }
        });
        onClose();
      },
    },
    {
      id: 'darkmode',
      name: 'Dark Mode',
      description: 'Switches to dark theme',
      action: () => {
        setTheme('dark');
        onClose();
      },
    },
    {
      id: 'lightmode',
      name: 'Light Mode',
      description: 'Switches to light theme',
      action: () => {
        setTheme('light');
        onClose();
      },
    },
    {
      id: 'reset-theme',
      name: 'Reset Theme',
      description: 'Resets theme to system default',
      action: () => {
        localStorage.removeItem('theme');
        setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        onClose();
      },
    },
    {
      id: 'random-tool',
      name: 'Random Tool',
      description: 'Opens a random tool from the app',
      action: () => {
        openRandomTool();
        onClose();
      },
    },
    {
      id: 'relax-mode',
      name: 'Relax Mode',
      description: 'Opens a random stress-relief tool',
      action: () => {
        openRandomRelaxTool();
        onClose();
      },
    },
    {
      id: 'refresh',
      name: 'Refresh',
      description: 'Soft refreshes the current tool',
      action: () => {
        window.location.reload();
        onClose();
      },
    },
    {
      id: 'toast-test',
      name: 'Test Toast',
      description: 'Shows a sample toast notification',
      action: () => {
        toast('This is a test notification', {
          description: 'The command palette is working correctly!',
          duration: 3000,
        });
        onClose();
      },
    },
    {
      id: 'faq',
      name: 'FAQ & Shortcuts',
      description: 'Shows FAQs and keyboard shortcuts',
      action: () => {
        setShowFaq(true);
        onClose();
      },
    },
  ];

  const fuse = new Fuse(commands, {
    keys: ['name', 'description', 'keywords'],
    threshold: 0.3,
  });

  const filteredCommands = search
    ? fuse.search(search).map((result) => result.item)
    : commands;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div
          className={`w-full max-w-2xl rounded-lg p-4 shadow-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or search..."
            className={`w-full rounded-md border p-2 outline-none ${
              theme === 'dark'
                ? 'border-gray-600 bg-gray-700 text-white'
                : 'border-gray-300 bg-gray-50 text-gray-900'
            }`}
          />
          <div className="mt-2 max-h-96 overflow-y-auto">
            {filteredCommands.map((command, index) => (
              <button
                key={command.id}
                onClick={() => command.action()}
                className={`w-full rounded-md p-2 text-left ${
                  index === selectedIndex
                    ? theme === 'dark'
                      ? 'bg-gray-700'
                      : 'bg-gray-100'
                    : ''
                } ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                } hover:bg-opacity-80`}
              >
                <div className="font-medium">{command.name}</div>
                <div
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {command.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <FaqModal isOpen={showFaq} onClose={() => setShowFaq(false)} />
    </>
  );
}; 