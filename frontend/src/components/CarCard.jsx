function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(value)
}

function CarCard({ car, emi, isShortlisted, onToggle }) {
  return (
    <article className="car-card">
      <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="car-image" />

      <div className="car-body">
        <div className="car-title-row">
          <h3>
            {car.make} {car.model}
          </h3>
          <span className="badge">{car.variant}</span>
        </div>

        <div className="meta-row">
          <span>{car.fuelType}</span>
          <span>{car.bodyType}</span>
        </div>

        <div className="details-grid">
          <div>
            <span>Price</span>
            <strong>{formatCurrency(car.price)}</strong>
          </div>
          <div>
            <span>Mileage</span>
            <strong>{formatNumber(car.mileage)} km/l</strong>
          </div>
          <div>
            <span>Safety</span>
            <strong>{car.safetyRating}/5</strong>
          </div>
          <div>
            <span>Body</span>
            <strong>{car.bodyType}</strong>
          </div>
        </div>

        <button
          className={isShortlisted ? 'shortlist-button active' : 'shortlist-button'}
          onClick={() => onToggle(car)}
        >
          {isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
        </button>
      </div>
    </article>
  )
}

export default CarCard
