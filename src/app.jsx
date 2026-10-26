import React, { useMemo, useState } from 'react';

const cars = [
  {
    id: 1,
    name: 'Mercedes-Benz C300',
    year: 2022,
    price: 48500000,
    type: 'Luxury',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 2,
    name: 'Toyota Camry',
    year: 2021,
    price: 28500000,
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image:
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 3,
    name: 'Range Rover Sport',
    year: 2022,
    price: 92000000,
    type: 'SUV',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 4,
    name: 'Porsche 911',
    year: 2023,
    price: 185000000,
    type: 'Sports',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
  },
];

const formatMoney = (value) => `₦${value.toLocaleString('en-NG')}`;

const makeWhatsAppLink = (carName) => {
  const message = `Hello, I'm interested in the ${carName} listed on The Auto Gallery website. Please provide more information.`;

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
};

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Vehicles');
  const [favorites, setFavorites] = useState([]);

  const filteredCars = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return cars.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm);

      const matchesCategory =
        category === 'All Vehicles' || car.type === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const resetFilters = () => {
    setSearch('');
    setCategory('All Vehicles');
  };

  return (
    <div className="site-shell">      <header className="navbar">
        <a className="brand" href="#home" aria-label="The Auto Gallery home">
          <span className="brand-mark">A.</span>
          <span className="brand-name">
            THE AUTO GALLERY
            <small>FIND YOUR DRIVE.</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#inventory">Browse Cars</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="nav-cta" href="#inventory">
          Explore Cars <span>↗</span>
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />

          <div className="hero-content">
            <p className="eyebrow">
              <span /> YOUR JOURNEY. YOUR RULES.
            </p>

            <h1>
              Find the car
              <br />
              that moves <em>you.</em>
            </h1>

            <p className="hero-copy">
              From everyday essentials to extraordinary machines, discover a
              vehicle that fits your lifestyle and your ambitions.
            </p>

            <div className="hero-actions">
              <a className="button button-light" href="#inventory">
                Explore Inventory <span>↗</span>
              </a>
              <a className="button button-outline" href="#contact">
                Talk to Our Team
              </a>
            </div>

            <div className="hero-note">
              <span className="note-line" />
              A BETTER WAY TO FIND YOUR NEXT CAR
            </div>
          </div>

          <div className="hero-counter">
            <span>01</span> / 04
          </div>
        </section>

        <section className="trust-strip" aria-label="Our promises">
          <div>
            <strong>01</strong>
            <span>Cars for every lifestyle</span>
          </div>
          <div>
            <strong>02</strong>
            <span>Clear vehicle information</span>
          </div>
          <div>
            <strong>03</strong>
            <span>Personalised assistance</span>
          </div>
          <div>
            <strong>04</strong>
            <span>Built around your needs</span>
          </div>
        </section>

        <section className="inventory section-pad" id="inventory">
          <div className="section-heading">
            <div>
              <p className="eyebrow dark-eyebrow">THE COLLECTION</p>
              <h2>
                Find your <em>next drive.</em>
              </h2>
              <p className="section-copy">
                Explore a selection of vehicles for different needs, budgets
                and journeys.
              </p>
            </div>

            <span className="collection-count">
              {filteredCars.length.toString().padStart(2, '0')} VEHICLES
            </span>
          </div>

          <div className="search-panel">
            <label className="search-field">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search make or model..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search vehicles by make or model"
              />
            </label>

            <label className="category-field">
              <span>Vehicle type</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                aria-label="Filter by vehicle type"
              >
                <option>All Vehicles</option>
                <option>Luxury</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Sports</option>
              </select>
            </label>
          </div>          <div className="car-grid">
            {filteredCars.map((car, index) => (
              <article className="car-card" key={car.id}>
                <div className="car-image-wrap">
                  <img src={car.image} alt={car.name} loading="lazy" />

                  <span className="car-tag">
                    {index === 0 ? 'FEATURED' : car.type.toUpperCase()}
                  </span>

                  <button
                    type="button"
                    className={`favorite-button ${
                      favorites.includes(car.id) ? 'is-favorite' : ''
                    }`}
                    onClick={() => toggleFavorite(car.id)}
                    aria-label={
                      favorites.includes(car.id)
                        ? `Remove ${car.name} from favourites`
                        : `Add ${car.name} to favourites`
                    }
                    aria-pressed={favorites.includes(car.id)}
                  >
                    {favorites.includes(car.id) ? '♥' : '♡'}
                  </button>
                </div>

                <div className="car-details">
                  <div className="car-year">{car.year} MODEL</div>
                  <h3>{car.name}</h3>

                  <div className="car-specs">
                    <span>{car.fuel}</span>
                    <span>{car.transmission}</span>
                    <span>{car.type}</span>
                  </div>

                  <div className="car-card-bottom">
                    <div>
                      <small>INDICATIVE PRICE</small>
                      <strong>{formatMoney(car.price)}</strong>
                    </div>

                    <a
                      className="car-arrow"
                      href={makeWhatsAppLink(car.name)}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Enquire about ${car.name} on WhatsApp`}
                    >
                      ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="empty-state">
              <h3>No matching vehicles found.</h3>
              <p>Try another search or choose a different category.</p>

              <button
                type="button"
                className="reset-button"
                onClick={resetFilters}
              >
                Reset filters
              </button>
            </div>
          )}

          <p className="price-disclaimer">
            Demonstration listings only. Prices and availability are
            illustrative and must be verified before publication.
          </p>
        </section>

        <section className="about-section" id="about">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85"
              alt="Car displayed in a premium automotive setting"
              loading="lazy"
            />

            <span className="image-caption">
              THE ART OF FINDING YOUR DRIVE.
            </span>
          </div>

          <div className="about-content">
            <p className="eyebrow dark-eyebrow">
              A DIFFERENT KIND OF DEALERSHIP
            </p>

            <h2>
              Good cars.
              <br />
              <em>Better choices.</em>
            </h2>

            <p>
              Finding the right car should feel exciting, not overwhelming.
              The Auto Gallery brings vehicle discovery into one convenient
              place, whether you're searching for your first car, a family SUV
              or something extraordinary.
            </p>

            <a className="text-link" href="#contact">
              Get to know us <span>↗</span>
            </a>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div>
            <p className="eyebrow">LET'S GET YOU MOVING</p>

            <h2>
              Your next car
              <br />
              could be <em>right here.</em>
            </h2>

            <p>
              Found something you like? Speak with our team about a vehicle,
              its availability or arranging a viewing.
            </p>
          </div>

          <a
            className="button button-light"
            href="https://wa.me/?text=Hello%2C%20I%27m%20interested%20in%20The%20Auto%20Gallery."
            target="_blank"
            rel="noreferrer"
          >
            Chat With Us on WhatsApp <span>↗</span>
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">A.</span>

          <span className="brand-name">
            THE AUTO GALLERY
            <small>FIND YOUR DRIVE.</small>
          </span>
        </a>

        <p>Discover your next drive, your way.</p>

        <span className="copyright">
          © {new Date().getFullYear()} The Auto Gallery
        </span>
      </footer>
    </div>
  );
}

export default App;
