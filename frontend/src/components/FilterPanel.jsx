function FilterPanel({ filters, setFilters, fuelOptions, bodyOptions, onApply, onReset }) {
  return (
    <aside className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <button className="reset-button" onClick={onReset}>
          Reset
        </button>
      </div>

      <label>
        <span>Fuel type</span>
        <select
          value={filters.fuelType}
          onChange={(event) => setFilters({ ...filters, fuelType: event.target.value })}
        >
          <option value="">All fuel types</option>
          {fuelOptions.map((fuel) => (
            <option key={fuel} value={fuel}>
              {fuel}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Body type</span>
        <select
          value={filters.bodyType}
          onChange={(event) => setFilters({ ...filters, bodyType: event.target.value })}
        >
          <option value="">All body types</option>
          {bodyOptions.map((body) => (
            <option key={body} value={body}>
              {body}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Min price (Budget)</span>
        <input
          type="number"
          min="0"
          value={filters.minPrice}
          onChange={(event) => setFilters({ ...filters, minPrice: event.target.value })}
          placeholder="e.g. 700000"
        />
      </label>

      <label>
        <span>Max price (Budget)</span>
        <input
          type="number"
          min="0"
          value={filters.maxPrice}
          onChange={(event) => setFilters({ ...filters, maxPrice: event.target.value })}
          placeholder="e.g. 2000000"
        />
      </label>

      <button className="apply-button" onClick={onApply}>
        Apply filter
      </button>
    </aside>
  )
}

export default FilterPanel
