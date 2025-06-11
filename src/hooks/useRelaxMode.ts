import { useNavigate } from 'react-router-dom';

const RELAX_TOOLS = [
  '/breathing-exercise-timer',
  '/digital-zen-garden',
  '/cloud-shape-generator',
  '/touch-the-grass',
];

export const useRelaxMode = () => {
  const navigate = useNavigate();

  const openRandomRelaxTool = () => {
    const randomIndex = Math.floor(Math.random() * RELAX_TOOLS.length);
    navigate(RELAX_TOOLS[randomIndex]);
  };

  return { openRandomRelaxTool };
}; 