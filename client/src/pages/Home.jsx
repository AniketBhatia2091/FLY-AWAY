import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Clock, Search, User, Phone, MapPin, Mail, Hash, Globe } from 'lucide-react';
import axios from 'axios';
import HeroSearch from '../components/HeroSearch';

const Home = () => {
    // Slideshow images
    const images = [
        '/images/bb13c29e-4bec-40c2-8325-fb2f3d1185dc.jpg',
        "/images/I'm A 19-Year-Old Turkish Guy Who Turns His Dreams Into Pictures (48 Pics).jpg",
        '/images/Beautiful Flower Wallpapers --Shinecoco_com.jpg',
        '/images/95c690a5-3ad8-4b7a-b6a6-16c476651a6f.jpg',
        '/images/🫶🏻.jpg'
    ];

    const [currentImg, setCurrentImg] = useState(0);
    const [searchLocation, setSearchLocation] = useState('');
    const [activeTab, setActiveTab] = useState('mountain');
    const [currentReview, setCurrentReview] = useState(0);
    const [destinations, setDestinations] = useState([]);
    const [filteredDestinations, setFilteredDestinations] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    // Helper function to enhance destination data with premium details
    const enhanceDestinationData = (dest) => {
        const enhancements = {
            goa: {
                subtitle: "Beaches • Nightlife • Water Sports",
                rating: 4.7,
                isBestseller: true,
                duration: { days: 4, nights: 3 },
                location: "North Goa, South Goa",
                groupSize: "2-6 People",
                meals: "Breakfast Included",
                highlights: [
                    "Beach hopping & water sports",
                    "Fort Aguada sunset",
                    "Saturday night market",
                    "Dudhsagar waterfall trek"
                ]
            },
            kerala: {
                subtitle: "Houseboats • Tea Hills • Beaches",
                rating: 4.8,
                isBestseller: true,
                duration: { days: 5, nights: 4 },
                location: "Alleppey, Munnar, Kovalam",
                groupSize: "2-4 People",
                meals: "Breakfast Included",
                highlights: [
                    "Private houseboat stay",
                    "Kathakali cultural show",
                    "Tea plantation tour",
                    "Sunset beach walk"
                ]
            },
            rajasthan: {
                subtitle: "Forts • Palaces • Desert Safari",
                rating: 4.6,
                isBestseller: false,
                duration: { days: 6, nights: 5 },
                location: "Jaipur, Udaipur, Jaisalmer",
                groupSize: "2-8 People",
                meals: "All Meals Included",
                highlights: [
                    "Palace & fort exploration",
                    "Camel desert safari",
                    "Traditional Rajasthani cuisine",
                    "Cultural folk performances"
                ]
            },
            himachal: {
                subtitle: "Trekking • Mountains • Adventure",
                rating: 4.9,
                isBestseller: true,
                duration: { days: 12, nights: 11 },
                location: "Manali, Kasol, Spiti Valley",
                groupSize: "4-10 People",
                meals: "Breakfast & Dinner",
                highlights: [
                    "High-altitude trekking",
                    "Mountain monastery visits",
                    "Camping under stars",
                    "Local village experiences"
                ]
            },
            ladakh: {
                subtitle: "Monasteries • Lakes • High Passes",
                rating: 4.9,
                isBestseller: true,
                duration: { days: 7, nights: 6 },
                location: "Leh, Nubra, Pangong",
                groupSize: "2-6 People",
                meals: "Breakfast Included",
                highlights: [
                    "Pangong Lake camping",
                    "Nubra Valley exploration",
                    "Buddhist monastery tour",
                    "High-altitude adventure"
                ]
            },
            kashmir: {
                subtitle: "Dal Lake • Gardens • Skiing",
                rating: 4.7,
                isBestseller: false,
                duration: { days: 5, nights: 4 },
                location: "Srinagar, Gulmarg, Pahalgam",
                groupSize: "2-5 People",
                meals: "Breakfast & Dinner",
                highlights: [
                    "Shikara ride on Dal Lake",
                    "Mughal garden visits",
                    "Gulmarg gondola ride",
                    "Valley of shepherds trek"
                ]
            },
            andaman: {
                subtitle: "Scuba • Islands • Marine Life",
                rating: 4.8,
                isBestseller: true,
                duration: { days: 6, nights: 5 },
                location: "Port Blair, Havelock, Neil",
                groupSize: "2-4 People",
                meals: "Breakfast Included",
                highlights: [
                    "Scuba diving & snorkeling",
                    "Radhanagar beach sunset",
                    "Cellular jail light show",
                    "Island hopping adventure"
                ]
            },
            uttarakhand: {
                subtitle: "Yoga • Rafting • Temples",
                rating: 4.5,
                isBestseller: false,
                duration: { days: 4, nights: 3 },
                location: "Rishikesh, Haridwar",
                groupSize: "2-8 People",
                meals: "Vegetarian Meals",
                highlights: [
                    "River rafting adventure",
                    "Yoga & meditation sessions",
                    "Ganga Aarti ceremony",
                    "Beatles Ashram visit"
                ]
            }
        };

        const enhancement = enhancements[dest.name] || {};
        return {
            ...dest,
            ...enhancement
        };
    };

    // Fetch destinations from API
    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const res = await axios.get('/api/destinations');
                if (res.data.success) {
                    // Enhance destination data with premium details
                    const enhanced = res.data.destinations.map(enhanceDestinationData);
                    setDestinations(enhanced);
                }
            } catch (error) {
                console.error('Error fetching destinations:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);

    // Slideshow auto-rotation
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImg((prev) => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [images.length]);

    const nextSlide = () => setCurrentImg((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    // Reviews data
    const reviews = [
        { stars: 5, text: "The Taj Mahal is a must-visit for anyone exploring India. The intricate marble work and the serene Yamuna River backdrop are unforgettable.", user: "Aarav Patel", img: "goa.jpg", time: "2 days ago" },
        { stars: 5, text: "Jaipur's Amer Fort is stunning, especially during sunset. The architecture and the views from the top are worth every step.", user: "Priya Sharma", img: "kerela.jpg", time: "5 days ago" },
        { stars: 5, text: "Goa offers the best beach experience in India. The vibrant culture, beautiful beaches, and amazing food make it unforgettable!", user: "Rohit Verma", img: "rajasthan.jpg", time: "1 week ago" },
        { stars: 5, text: "Kerala's backwaters are serene and picturesque. The houseboat ride through the tranquil waters was the highlight of our trip.", user: "Anjali Menon", img: "ladakh.jpg", time: "3 days ago" },
        { stars: 5, text: "Manali's snow-covered peaks and scenic views are breathtaking. Perfect destination for adventure and relaxation alike.", user: "Vikram Singh", img: "uttrakhand.jpg", time: "4 days ago" }
    ];

    const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
    const prevReview = () => setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

    // Gallery data
    const gallery = {
        mountain: [
            { img: "Alps Snow Mountain Sunset Clouds iPhone Wallpaper.jpg", alt: "Mountain 1" },
            { img: "It's a beautiful world.jpg", alt: "Mountain 2" },
            { img: "📍colorado.jpg", alt: "Mountain 3" }
        ],
        beaches: [
            { img: "12 Beautiful Shelling Beaches In Florida (1).jpg", alt: "Beach 1" },
            { img: "Local Experts.jpg", alt: "Beach 2" },
            { img: "Oahu Instagram Spots_ 23 Beautiful Photography Destinations ⋆ We Dream of Travel Blog (1).jpg", alt: "Beach 3" }
        ],
        historical: [
            { img: "0f98cf26-b0e4-4c5e-a7dc-2f3c6c92da87.jpg", alt: "Patrika Gate" },
            { img: "mumbai_gateway.jpg", alt: "Mumbai Gateway" },
            { img: "delhi_historical.jpg", alt: "Safdarjung Tomb" }
        ]
    };


    const handleSearch = (query) => {
        // Use the query passed from HeroSearch component
        if (query && query.trim()) {
            const queryLower = query.toLowerCase().trim();

            // Filter destinations based on search query
            const filtered = destinations.filter(dest =>
                dest.name?.toLowerCase().includes(queryLower) ||
                dest.title?.toLowerCase().includes(queryLower) ||
                dest.location?.toLowerCase().includes(queryLower)
            );

            // Set filtered results and search query
            setFilteredDestinations(filtered);
            setSearchQuery(query);

            if (filtered.length > 0) {
                // Scroll to Recent Deals section
                const dealsSection = document.querySelector('.deals-section');
                if (dealsSection) {
                    dealsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }

                // Show a success message
                setTimeout(() => {
                    alert(`Found ${filtered.length} destination(s) matching "${query}"`);
                }, 500);
            } else {
                alert(`No destinations found for "${query}". Try searching for "Goa", "Kerala", or "Rajasthan".`);
            }
        }
        // No else needed - HeroSearch component handles empty state with disabled button
    };

    const clearSearch = () => {
        setFilteredDestinations(null);
        setSearchQuery('');
    };


    return (
        <main>
            {/* Slideshow Section */}
            <div className="sliderContainer" id="slideshoww">
                <div className="slider" style={{ transform: `translateX(-${currentImg * 100}%)` }}>
                    {images.map((img, index) => (
                        <img key={index} src={img} alt={`Slide ${index}`} width="100%" height="auto" />
                    ))}
                </div>
                <div className="textOverlay">
                    <h1>Explore the World's Most Breathtaking Destinations!</h1>
                    <p>Discover unforgettable experiences and create lasting memories</p>

                    {/* Advanced Search Component */}
                    <HeroSearch
                        destinations={destinations}
                        onSearch={handleSearch}
                    />
                </div>
                <div className="rightArrow arrow" onClick={nextSlide}><ArrowRight /></div>
                <div className="leftArrow arrow" onClick={prevSlide}><ArrowLeft /></div>
            </div>

            {/* Recent Deals Section */}
            <div className="deals-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ margin: 0 }}>
                        {filteredDestinations ? `Search Results for "${searchQuery}"` : 'Recent Deals'}
                    </h2>
                    {filteredDestinations && (
                        <button
                            onClick={clearSearch}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: '#F97316',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 8px rgba(249, 115, 22, 0.3)'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#EA580C';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = '#F97316';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 2px 8px rgba(249, 115, 22, 0.3)';
                            }}
                        >
                            Clear Search
                        </button>
                    )}
                </div>
                {loading ? (
                    <p>Loading destinations...</p>
                ) : (
                    <>
                        {filteredDestinations !== null && filteredDestinations.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '3rem',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '12px',
                                color: '#666'
                            }}>
                                <p style={{ fontSize: '18px', marginBottom: '1rem' }}>No destinations found for "{searchQuery}"</p>
                                <p style={{ fontSize: '14px' }}>Try searching for "Goa", "Kerala", or "Rajasthan"</p>
                            </div>
                        ) : (
                            <div className="deals-container">
                                {(filteredDestinations || destinations).slice(0, 8).map((deal) => (
                                    <DealCard key={deal.id} {...deal} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Why Choose Us Section */}
            <div className="why-choose-us-section" id="about">
                <h2>Why Choose Us</h2>
                <div className="why-choose-us-container">
                    <WhyCard
                        img="Download Plan map Vector Icon for free.jpg"
                        title="Handpicked Adventures"
                        text="We curate the best travel experiences to ensure every trip is unique, exciting, and tailored to you."
                    />
                    <WhyCard
                        img="Download Dealing Doodle Icon Illustration for free.jpg"
                        title="Exclusive Deals"
                        text="Get access to deals and offers that you won't find anywhere else. Save big on your next adventure!"
                    />
                    <WhyCard
                        img="Premium Vector _ Vintage travel suitcase hand drawn outline doodle icon_ Holiday trip, baggage and luggage, journey concept.jpg"
                        title="Personalized Itineraries"
                        text="Plan your journey based on your interests, from tranquil escapes to thrilling adventures, we cover it all."
                    />
                </div>
            </div>

            {/* Explore Section */}
            <div className="explore-section" id="explore">
                <div className="explore-content">
                    <div className="explore-icon">
                        <Globe size={48} />
                    </div>
                    <h1 className="explore-title">Explore the World</h1>
                    <p className="explore-subtitle">
                        Discover the most popular destinations around the world. Just type in a location,
                        and we'll show you the top attractions. Start your journey now by searching for your
                        next adventure!
                    </p>
                    <div className="search-container">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Enter a destination (e.g., Goa, Kerala, Rajasthan)..."
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button onClick={handleSearch}>
                            Search
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Photo Gallery Section */}
            <div className="section-title">
                <h1>Photo Gallery</h1>
            </div>
            <div className="section-sub-title">
                <p>Discover breathtaking moments from our recent tours and adventures. Here are some of our favorite memories captured during these trips.</p>
            </div>

            <div className="topwear-tabs">
                <div className="tab-cont">
                    <div className="tab" id="tabs">
                        <button
                            className={`tablinks ${activeTab === 'mountain' ? 'active' : ''}`}
                            onClick={() => setActiveTab('mountain')}
                        >Mountain</button>
                        <button
                            className={`tablinks ${activeTab === 'beaches' ? 'active' : ''}`}
                            onClick={() => setActiveTab('beaches')}
                        >Beaches</button>
                        <button
                            className={`tablinks ${activeTab === 'historical' ? 'active' : ''}`}
                            onClick={() => setActiveTab('historical')}
                        >Historical</button>
                    </div>
                </div>

                <div className="tab-content" style={{ display: activeTab === 'mountain' ? 'flex' : 'none' }}>
                    {gallery.mountain.map((item, i) => (
                        <GalleryItem key={i} img={item.img} alt={item.alt} />
                    ))}
                </div>
                <div className="tab-content" style={{ display: activeTab === 'beaches' ? 'flex' : 'none' }}>
                    {gallery.beaches.map((item, i) => (
                        <GalleryItem key={i} img={item.img} alt={item.alt} />
                    ))}
                </div>
                <div className="tab-content" style={{ display: activeTab === 'historical' ? 'flex' : 'none' }}>
                    {gallery.historical.map((item, i) => (
                        <GalleryItem key={i} img={item.img} alt={item.alt} />
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="stats-container">
                <StatBox icon={<Clock />} count="1" label="Years of Experience" />
                <StatBox icon={<Search />} count="52" label="Tour Packages" />
                <StatBox icon={<User />} count="93" label="Happy Customers" />
                <StatBox icon={<Phone />} count="273" label="Days Support" />
            </div>

            {/* Reviews Section */}
            <div className="parallax-bg">
                <div className="carousel-container">
                    <div className="carousel">
                        <div className="carousel-item">
                            <div className="review">
                                <div className="stars">★★★★★</div>
                                <p>{reviews[currentReview].text}</p>
                                <div className="user">
                                    <img src={`/images/${reviews[currentReview].img}`} alt={reviews[currentReview].user} />
                                    <div>
                                        <h4>{reviews[currentReview].user}</h4>
                                        <span>{reviews[currentReview].time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="prev" onClick={prevReview}>❮</button>
                    <button className="next" onClick={nextReview}>❯</button>
                </div>
            </div>

        </main>
    );
};

// Enhanced Deal Card Component with Premium Features
const DealCard = ({
    name,
    title,
    subtitle,
    image,
    discount,
    rating,
    isBestseller,
    duration,
    location,
    groupSize,
    meals,
    highlights,
    originalPrice,
    price
}) => (
    <div className="deal-card">
        {/* Image Section with Badges */}
        <div className="card-image-wrapper">
            <img
                src={`/images/${image}`}
                alt={title}
                onError={(e) => {
                    e.target.src = '/images/default.jpg';
                }}
            />
            {/* Badge Row */}
            <div className="badge-row">
                {discount && (
                    <div className="badge badge-discount">
                        🔥 -{discount}% OFF
                    </div>
                )}
                {rating && (
                    <div className="badge badge-rating">
                        ⭐ {rating}
                    </div>
                )}
                {isBestseller && (
                    <div className="badge badge-bestseller">
                        🏆 Bestseller
                    </div>
                )}
            </div>
        </div>

        {/* Card Content */}
        <div className="card-content">
            {/* Title + Subtitle */}
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </div>

            {/* Quick Info Icons Row */}
            <div className="quick-info">
                {duration && (
                    <div className="info-item">
                        <span className="info-icon">🕒</span>
                        <span className="info-text">{duration.days} Days / {duration.nights} Nights</span>
                    </div>
                )}
                {location && (
                    <div className="info-item">
                        <span className="info-icon">📍</span>
                        <span className="info-text">{location}</span>
                    </div>
                )}
                {groupSize && (
                    <div className="info-item">
                        <span className="info-icon">👥</span>
                        <span className="info-text">{groupSize}</span>
                    </div>
                )}
                {meals && (
                    <div className="info-item">
                        <span className="info-icon">🍽</span>
                        <span className="info-text">{meals}</span>
                    </div>
                )}
            </div>

            {/* Highlights Section */}
            {highlights && highlights.length > 0 && (
                <div className="highlights">
                    <ul>
                        {highlights.slice(0, 4).map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Pricing Section */}
            <div className="pricing-section">
                <div className="price-container">
                    {originalPrice && (
                        <span className="original-price">
                            {originalPrice.toString().includes('₹') ? originalPrice : `₹${originalPrice}`}
                        </span>
                    )}
                    <span className="current-price">
                        {price.toString().includes('₹') ? price : `₹${price}`}
                    </span>
                </div>
                <span className="price-label">(per person)</span>
            </div>

            {/* Dual CTA Buttons */}
            <div className="cta-buttons">
                <Link to={`/destinations/${name}`} className="btn-primary">
                    Book Now
                </Link>
                <Link to={`/destinations/${name}`} className="btn-secondary">
                    View Details
                </Link>
            </div>
        </div>
    </div>
);

// Why Choose Us Card Component
const WhyCard = ({ img, title, text }) => (
    <div className="why-choose-us-card">
        <img src={`/images/${img}`} alt={title} />
        <h3>{title}</h3>
        <p>{text}</p>
    </div>
);

// Stat Box Component
const StatBox = ({ icon, count, label }) => (
    <div className="stat-box">
        <div className="icon">{icon}</div>
        <div className="counter-number">{count}</div>
        <p>{label}</p>
    </div>
);

// Gallery Item Component
const GalleryItem = ({ img, alt }) => (
    <a href="#">
        <div className="image-overlay-container">
            <img src={`/images/${img}`} alt={alt} />
            <div className="overlay">
                <p>View Details</p>
            </div>
        </div>
    </a>
);

export default Home;
