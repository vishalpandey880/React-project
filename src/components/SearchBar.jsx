import { Search } from 'lucide-react';

export function SearchBar({ value, onChange, suggestions = [] }) {
  return (
    <div className="search-wrap">
      <label className="search-bar">
        <Search size={18} />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by title, author, or genre"
        />
      </label>
      {value && suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((title) => (
            <button key={title} onClick={() => onChange(title)}>{title}</button>
          ))}
        </div>
      )}
    </div>
  );
}
