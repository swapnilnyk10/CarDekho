import { useEffect, useMemo, useState } from 'react'
import './App.css'
import FilterPanel from './components/FilterPanel'
import CarCard from './components/CarCard'
import CompareView from './components/CompareView'
import { getCars } from './services/carService'

function calculateEMI(price, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12
  const months = years * 12

  if (monthlyRate <= 0 || months <= 0) {
    return price / months || 0
  }

  const powerFactor = Math.pow(1 + monthlyRate, months)
  return (price * monthlyRate * powerFactor) / (powerFactor - 1)
}

function App() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [view, setView] = useState('catalog')
  const [interestRate, setInterestRate] = useState(8.3)
  const [loanYears, setLoanYears] = useState(5)
  const [shortlist, setShortlist] = useState([])
  const [filters, setFilters] = useState({
    fuelType: '',
    bodyType: '',
    minPrice: '',
    maxPrice: '',
  })

  const loadCars = async (params = {}) => {
    setLoading(true)
    setError('')

    try {
      const data = await getCars(params)
      setCars(data)
    } catch (err) {
      setCars([])
      setError('Unable to load cars from the server. Please make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCars()
  }, [])

  const fuelOptions = useMemo(() => {
    return [...new Set(cars.map((car) => car.fuelType).filter(Boolean))].sort()
  }, [cars])

  const bodyOptions = useMemo(() => {
    return [...new Set(cars.map((car) => car.bodyType).filter(Boolean))].sort()
  }, [cars])

  const handleApplyFilters = () => {
    loadCars({
      fuelType: filters.fuelType || undefined,
      bodyType: filters.bodyType || undefined,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    })
    setView('catalog')
  }

  const handleResetFilters = () => {
    setFilters({ fuelType: '', bodyType: '', minPrice: '', maxPrice: '' })
    loadCars()
  }

  const toggleShortlist = (car) => {
    setShortlist((current) => {
      const exists = current.some((item) => item.id === car.id)
      return exists ? current.filter((item) => item.id !== car.id) : [...current, car]
    })
  }

  const openCompare = () => {
    if (shortlist.length === 0) {
      setError('Select at least one car to compare.')
      return
    }
    setView('compare')
  }

  return (
    <div className="car-app">
      <header className="navbar">
        <div className="brand">
          <span className="brand-icon">🚗</span>
          <span>CarDekho</span>
        </div>
        <div className="navbar-title">Find your perfect car</div>
        <button className="compare-button" onClick={openCompare}>
          Compare shortlist ({shortlist.length})
        </button>
      </header>

      {view === 'compare' ? (
        <CompareView
          shortlist={shortlist}
          interestRate={interestRate}
          loanYears={loanYears}
          onInterestRateChange={setInterestRate}
          onLoanYearsChange={setLoanYears}
          onRemove={toggleShortlist}
          onBack={() => setView('catalog')}
        />
      ) : (
        <main className="catalog-layout">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            fuelOptions={fuelOptions}
            bodyOptions={bodyOptions}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
          />

          <section className="listing-panel">
            {error && <div className="error-banner">{error}</div>}

            {loading ? (
              <div className="loading-state">Loading cars...</div>
            ) : cars.length === 0 ? (
              <div className="empty-state">No cars match the selected filters.</div>
            ) : (
              <div className="car-grid">
                {cars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    emi={calculateEMI(car.price, interestRate, loanYears)}
                    isShortlisted={shortlist.some((item) => item.id === car.id)}
                    onToggle={toggleShortlist}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      )}
    </div>
  )
}

export default App
