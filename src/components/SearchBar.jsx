import { Search } from 'lucide-react';

export function SearchBar({ value, onChange, suggestions = [], recentSearches = [], popularSearches = [], onSubmitSearch, loading = false }) {
  const apply = (term) => {
    onChange(term);
    onSubmitSearch?.(term);
  };

  return (
    <div className="search-wrap">
      <label className="search-bar">
        <Search size={18} />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              onSubmitSearch?.(value);
            }
          }}
          placeholder="Search by title, author, or genre"
        />
        <button className="search-submit" type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => onSubmitSearch?.(value)} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </label>
      {value && suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((title) => (
            <button key={title} onClick={() => apply(title)}>{title}</button>
          ))}
        </div>
      )}
      <div className="search-chip-row">
        {popularSearches.map((term) => <button key={term} onClick={() => apply(term)}>{term}</button>)}
        {recentSearches.map((term) => <button className="recent-chip" key={term} onClick={() => apply(term)}>{term}</button>)}
      </div>
    </div>
  );
}
