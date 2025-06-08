import { useNavigate } from 'react-router-dom';

interface Tool {
  name: string;
  path: string;
  keywords: string[];
}

const TOOLS: Tool[] = [
  { name: 'JSON Tools', path: '/json', keywords: ['json', 'format', 'parse'] },
  { name: 'CSV to JSON', path: '/csv-json', keywords: ['csv', 'json', 'convert'] },
  { name: 'URL Tools', path: '/url', keywords: ['url', 'encode', 'decode'] },
  { name: 'URL Parser', path: '/url-parser', keywords: ['url', 'parse', 'components'] },
  { name: 'UUID Generator', path: '/uuid', keywords: ['uuid', 'guid', 'generate'] },
  { name: 'Timestamp Converter', path: '/timestamp', keywords: ['timestamp', 'date', 'time'] },
  { name: 'Text Case Converter', path: '/text-case', keywords: ['text', 'case', 'convert'] },
  { name: 'Regex Tester', path: '/regex', keywords: ['regex', 'pattern', 'match'] },
  { name: 'JSON Beautifier', path: '/json-beautifier', keywords: ['json', 'format', 'beautify'] },
  { name: 'Color Converter', path: '/color-converter', keywords: ['color', 'convert', 'hex', 'rgb'] },
  { name: 'Diff Checker', path: '/diff-checker', keywords: ['diff', 'compare', 'text'] },
  { name: 'Color Name Finder', path: '/color-name', keywords: ['color', 'name', 'find'] },
  { name: 'Duplicate Line Remover', path: '/duplicate-line-remover', keywords: ['duplicate', 'lines', 'remove'] },
  { name: 'Character Counter', path: '/character-counter', keywords: ['character', 'count', 'text'] },
  { name: 'Whitespace Cleaner', path: '/whitespace-cleaner', keywords: ['whitespace', 'clean', 'text'] },
  { name: 'Percent Off Calculator', path: '/percent-off-calculator', keywords: ['percent', 'discount', 'calculate'] },
  { name: 'Percentage Calculator', path: '/percentage-calculator', keywords: ['percentage', 'calculate'] },
  { name: 'Prompt Splitter', path: '/prompt-splitter', keywords: ['prompt', 'split', 'text'] },
  { name: 'SVG URL Encoder', path: '/svg-url-encoder', keywords: ['svg', 'url', 'encode'] },
  { name: 'Box Shadow Generator', path: '/box-shadow-generator', keywords: ['box-shadow', 'css', 'generate'] },
  { name: 'CSS Unit Converter', path: '/css-unit-converter', keywords: ['css', 'unit', 'convert'] },
  { name: 'Base64 File Converter', path: '/base64-file-converter', keywords: ['base64', 'file', 'convert'] },
  { name: 'Base64 Encoder/Decoder', path: '/base64', keywords: ['base64', 'encode', 'decode'] },
  { name: 'Cron Job Generator', path: '/cron-job-generator', keywords: ['cron', 'schedule', 'generate'] },
  { name: 'Postcode Lookup', path: '/postcode-lookup', keywords: ['postcode', 'address', 'lookup'] },
  { name: 'Checkbox/Radio Generator', path: '/checkbox-radio-generator', keywords: ['checkbox', 'radio', 'generate'] },
  { name: 'CSV Table Viewer', path: '/csv-table-viewer', keywords: ['csv', 'table', 'view'] },
  { name: 'Lorem Ipsum Generator', path: '/lorem-ipsum-generator', keywords: ['lorem', 'ipsum', 'text'] },
  { name: 'Password Strength Checker', path: '/password-strength-checker', keywords: ['password', 'strength', 'check'] },
  { name: 'Placeholder Image Generator', path: '/placeholder-image-generator', keywords: ['placeholder', 'image', 'generate'] },
  { name: 'Color Picker', path: '/color-picker', keywords: ['color', 'picker', 'select'] },
  { name: 'Text Diff Highlighter', path: '/text-diff-highlighter', keywords: ['diff', 'text', 'highlight'] },
  { name: 'Developer Excuse Generator', path: '/developer-excuse-generator', keywords: ['excuse', 'developer', 'fun'] },
  { name: 'Unit Converter', path: '/unit-converter', keywords: ['unit', 'convert', 'measurement'] },
  { name: 'Binary to Text Converter', path: '/binary-to-text-converter', keywords: ['binary', 'text', 'convert'] },
  { name: 'Time Zone Converter', path: '/timezone-converter', keywords: ['timezone', 'convert', 'time'] },
  { name: 'HTTP Status Code Explainer', path: '/http-status-code-explainer', keywords: ['http', 'status', 'code'] },
  { name: 'CSS Gradient Generator', path: '/css-gradient-generator', keywords: ['gradient', 'css', 'generate'] },
  { name: 'Responsive Image Tester', path: '/responsive-image-tester', keywords: ['responsive', 'image', 'test'] },
  { name: 'Date Difference Calculator', path: '/date-difference-calculator', keywords: ['date', 'difference', 'calculate'] },
  { name: 'Cron Expression Visualizer', path: '/cron-expression-visualizer', keywords: ['cron', 'expression', 'visualize'] },
  { name: 'Tab Space Converter', path: '/tab-space-converter', keywords: ['tab', 'space', 'convert'] },
  { name: 'Text Sorter', path: '/text-sorter', keywords: ['text', 'sort', 'order'] },
  { name: 'SVG Cleaner', path: '/svg-cleaner', keywords: ['svg', 'clean', 'optimize'] },
  { name: 'Color Blindness Simulator', path: '/color-blindness-simulator', keywords: ['color', 'blindness', 'simulate'] },
  { name: 'JSON Validator', path: '/json-validator', keywords: ['json', 'validate', 'check'] },
  { name: 'Screen DPI Calculator', path: '/screen-dpi-calculator', keywords: ['dpi', 'screen', 'calculate'] },
  { name: 'Image Converter', path: '/image-converter', keywords: ['image', 'convert', 'format'] },
  { name: 'Calculator', path: '/calculator', keywords: ['calculator', 'math', 'calculate'] },
  { name: 'Text Replacer', path: '/text-replacer', keywords: ['text', 'replace', 'find'] },
  { name: 'Image Editor', path: '/image-editor', keywords: ['image', 'edit', 'modify'] },
  { name: 'Working Days Calculator', path: '/working-days-calculator', keywords: ['working', 'days', 'calculate'] },
  { name: 'Ratio Calculator', path: '/ratio-calculator', keywords: ['ratio', 'calculate', 'proportion'] },
  { name: 'BigCommerce Status', path: '/bigcommerce-status', keywords: ['bigcommerce', 'status', 'check'] },
  { name: 'Shopify Status', path: '/shopify-status', keywords: ['shopify', 'status', 'check'] },
  { name: 'Image Resizer', path: '/image-resizer', keywords: ['image', 'resize', 'dimensions'] },
  { name: 'Layout Grid Generator', path: '/layout-grid-generator', keywords: ['layout', 'grid', 'generate'] },
  { name: 'Border Radius Generator', path: '/border-radius-generator', keywords: ['border', 'radius', 'generate'] },
  { name: 'Scrollbar Generator', path: '/scrollbar-generator', keywords: ['scrollbar', 'css', 'generate'] },
  { name: 'Button Generator', path: '/button-generator', keywords: ['button', 'css', 'generate'] },
  { name: 'Loader Generator', path: '/loader-generator', keywords: ['loader', 'spinner', 'generate'] },
  { name: 'Accordion Generator', path: '/accordion-generator', keywords: ['accordion', 'css', 'generate'] },
  { name: 'Skeleton Loader Generator', path: '/skeleton-loader-generator', keywords: ['skeleton', 'loader', 'generate'] },
  { name: 'Responsive Tester', path: '/responsive-tester', keywords: ['responsive', 'test', 'view'] },
  { name: 'Todo List', path: '/todo-list', keywords: ['todo', 'list', 'tasks'] },
  { name: 'Breathing Exercise Timer', path: '/breathing-exercise-timer', keywords: ['breathing', 'exercise', 'timer'] },
  { name: 'Digital Zen Garden', path: '/digital-zen-garden', keywords: ['zen', 'garden', 'relax'] },
  { name: 'Cloud Shape Generator', path: '/cloud-shape-generator', keywords: ['cloud', 'shape', 'generate'] },
];

export const useSearch = () => {
  const navigate = useNavigate();

  const searchTools = (query: string) => {
    const searchQuery = query.toLowerCase();
    const matchingTool = TOOLS.find(
      (tool) =>
        tool.name.toLowerCase().includes(searchQuery) ||
        tool.keywords.some((keyword) => keyword.includes(searchQuery))
    );

    if (matchingTool) {
      navigate(matchingTool.path);
    }
  };

  return { searchTools };
}; 