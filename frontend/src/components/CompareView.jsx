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

function CompareView({ shortlist, interestRate, loanYears, onInterestRateChange, onLoanYearsChange, onRemove, onBack }) {
  const calculateEMI = (price) => {
    const monthlyRate = interestRate / 100 / 12
    const months = loanYears * 12

    if (monthlyRate <= 0 || months <= 0) {
      return price / months || 0
    }

    const powerFactor = Math.pow(1 + monthlyRate, months)
    return (price * monthlyRate * powerFactor) / (powerFactor - 1)
  }

  const bestPrice = shortlist.length ? Math.min(...shortlist.map((car) => car.price)) : null
  const bestMileage = shortlist.length ? Math.max(...shortlist.map((car) => car.mileage)) : null
  const bestSafety = shortlist.length ? Math.max(...shortlist.map((car) => car.safetyRating)) : null
  const bestEMI = shortlist.length ? Math.min(...shortlist.map((car) => calculateEMI(car.price))) : null

  return (
    <section className="compare-view">
      <div className="compare-header">
        <button className="back-button" onClick={onBack}>
          ← Back to cars
        </button>
        <h2>Shortlisted cars comparison</h2>
      </div>

      <div className="compare-loan-controls">
        <label>
          <span>Interest rate (%)</span>
          <input
            type="number"
            min="0"
            step="0.1"
            value={interestRate}
            onChange={(event) => onInterestRateChange(Number(event.target.value) || 0)}
          />
        </label>

        <label>
          <span>Loan duration (years)</span>
          <input
            type="number"
            min="1"
            max="30"
            value={loanYears}
            onChange={(event) => onLoanYearsChange(Number(event.target.value) || 1)}
          />
        </label>
      </div>

      {shortlist.length === 0 ? (
        <div className="empty-state">
          <p>No shortlisted cars yet.</p>
        </div>
      ) : (
        <div className="compare-scroll-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="compare-sticky-col compare-field-header">Fields</th>
                {shortlist.map((car) => {
                  const emi = calculateEMI(car.price)
                  const isBestPrice = car.price === bestPrice
                  const isBestMileage = car.mileage === bestMileage
                  const isBestSafety = car.safetyRating === bestSafety
                  const isBestEMI = emi === bestEMI

                  return (
                    <th key={car.id} className="compare-car-header">
                      <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="compare-image" />
                      <div className="compare-car-title">{car.make} {car.model}</div>
                      <div className="compare-tags">
                        {isBestPrice && <span className="compare-tag best-price">Lowest price</span>}
                        {isBestMileage && <span className="compare-tag best-mileage">Best mileage</span>}
                        {isBestSafety && <span className="compare-tag best-safety">Top safety</span>}
                        {isBestEMI && <span className="compare-tag best-emi">Lowest EMI</span>}
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="compare-sticky-col compare-field-label">Variant</td>
                {shortlist.map((car) => (
                  <td key={`${car.id}-variant`}>{car.variant}</td>
                ))}
              </tr>
              <tr>
                <td className="compare-sticky-col compare-field-label">Fuel Type</td>
                {shortlist.map((car) => (
                  <td key={`${car.id}-fuel`}>{car.fuelType}</td>
                ))}
              </tr>
              <tr>
                <td className="compare-sticky-col compare-field-label">Body Type</td>
                {shortlist.map((car) => (
                  <td key={`${car.id}-body`}>{car.bodyType}</td>
                ))}
              </tr>
              <tr>
                <td className="compare-sticky-col compare-field-label">Price</td>
                {shortlist.map((car) => (
                  <td key={`${car.id}-price`}>{formatCurrency(car.price)}</td>
                ))}
              </tr>
              <tr>
                <td className="compare-sticky-col compare-field-label">Mileage</td>
                {shortlist.map((car) => (
                  <td key={`${car.id}-mileage`}>{formatNumber(car.mileage)} km/l</td>
                ))}
              </tr>
              <tr>
                <td className="compare-sticky-col compare-field-label">Safety</td>
                {shortlist.map((car) => (
                  <td key={`${car.id}-safety`}>{car.safetyRating}/5</td>
                ))}
              </tr>
              <tr>
                <td className="compare-sticky-col compare-field-label">EMI</td>
                {shortlist.map((car) => (
                  <td key={`${car.id}-emi`}>{formatCurrency(calculateEMI(car.price))}</td>
                ))}
              </tr>
              <tr>
                <td className="compare-sticky-col compare-field-label">Action</td>
                {shortlist.map((car) => (
                  <td key={`${car.id}-action`}>
                    <button className="remove-button" onClick={() => onRemove(car)}>
                      Remove from shortlist
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default CompareView
