import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onClose?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClear = () => {
    setQuery('');
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-[#9E9E9E]" size={18} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or username"
          className="w-full bg-[#354766] text-[#E0E0E0] placeholder-[#9E9E9E] pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
        />
        {(query || onClose) && (
          <button
            onClick={handleClear}
            className="absolute right-3 text-[#9E9E9E] hover:text-[#E0E0E0]"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;