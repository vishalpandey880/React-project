export function FilterSidebar({
  genres,
  authors,
  genre,
  author,
  condition,
  availability,
  maxPrice,
  minRating,
  onGenreChange,
  onAuthorChange,
  onConditionChange,
  onAvailabilityChange,
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
          <option>Like New</option>
          <option>Good</option>
          <option>Fair</option>
          <option>Old but usable</option>
        </select>
      </label>
      <label>
        Availability
        <select value={availability} onChange={(event) => onAvailabilityChange(event.target.value)}>
          <option>All</option>
          <option>In Stock</option>
          <option>Only few left</option>
          <option>Out of Stock</option>
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
