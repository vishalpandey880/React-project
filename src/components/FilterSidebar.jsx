export function FilterSidebar({
  genres,
  authors,
  genre,
  author,
  condition,
  maxPrice,
  minRating,
  onGenreChange,
  onAuthorChange,
  onConditionChange,
  onMaxPriceChange,
  onMinRatingChange,
  onReset,
}) {
  return (
    <aside className="filter-panel">
      <div>
        <h2>Filters</h2>
        <button onClick={onReset}>Reset</button>
      </div>
      <label>
        Genre
        <select value={genre} onChange={(event) => onGenreChange(event.target.value)}>
          <option>All</option>
          {genres.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label>
        Author
        <select value={author} onChange={(event) => onAuthorChange(event.target.value)}>
          <option>All</option>
          {authors.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label>
        Condition
        <select value={condition} onChange={(event) => onConditionChange(event.target.value)}>
          <option>All</option>
          <option>New</option>
          <option>Used</option>
        </select>
      </label>
      <label>
        Max price: ₹{maxPrice}
        <input type="range" min="250" max="1200" step="50" value={maxPrice} onChange={(event) => onMaxPriceChange(Number(event.target.value))} />
      </label>
      <label>
        Minimum rating
        <select value={minRating} onChange={(event) => onMinRatingChange(Number(event.target.value))}>
          <option value="0">Any rating</option>
          <option value="4">4 stars and above</option>
          <option value="4.5">4.5 stars and above</option>
          <option value="4.8">4.8 stars and above</option>
        </select>
      </label>
    </aside>
  );
}
