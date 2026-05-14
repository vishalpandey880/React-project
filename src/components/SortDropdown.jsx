export function SortDropdown({ value, onChange }) {
  return (
    <label className="sort-box">
      Sort
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="featured">Featured</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Rating: High to Low</option>
        <option value="rating-low">Rating: Low to High</option>
      </select>
    </label>
  );
}
