import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, X } from 'lucide-react';
import '../assets/css/heroSearch.css';

const HeroSearch = ({ destinations, onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [typoCorrection, setTypoCorrection] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef(null);

    // Trending destinations
    const trendingDestinations = ['Goa', 'Kerala', 'Rajasthan', 'Himachal', 'Ladakh'];

    // Levenshtein distance for typo correction
    const levenshteinDistance = (str1, str2) => {
        const track = Array(str2.length + 1).fill(null).map(() =>
            Array(str1.length + 1).fill(null)
        );
        for (let i = 0; i <= str1.length; i++) track[0][i] = i;
        for (let j = 0; j <= str2.length; j++) track[j][0] = j;

        for (let j = 1; j <= str2.length; j++) {
            for (let i = 1; i <= str1.length; i++) {
                const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(
                    track[j][i - 1] + 1,
                    track[j - 1][i] + 1,
                    track[j - 1][i - 1] + indicator
                );
            }
        }
        return track[str2.length][str1.length];
    };

    // Debounced search with typo correction
    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            setTypoCorrection(null);
            setShowSuggestions(false);
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(() => {
            const queryLower = query.toLowerCase();

            // Find matching destinations
            const matches = destinations.filter(dest =>
                dest.name?.toLowerCase().includes(queryLower) ||
                dest.location?.toLowerCase().includes(queryLower)
            ).slice(0, 5);

            setSuggestions(matches);

            // Typo correction
            if (matches.length === 0) {
                let closestMatch = null;
                let minDistance = Infinity;

                destinations.forEach(dest => {
                    const destName = dest.name?.toLowerCase() || '';
                    const distance = levenshteinDistance(queryLower, destName);

                    if (distance < minDistance && distance <= 2) {
                        minDistance = distance;
                        closestMatch = dest.name;
                    }
                });

                setTypoCorrection(closestMatch);
            } else {
                setTypoCorrection(null);
            }

            setShowSuggestions(true);
            setIsSearching(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, destinations]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (!showSuggestions) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                handleSuggestionClick(suggestions[selectedIndex]);
            } else {
                handleSearch();
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    const handleSearch = () => {
        setShowSuggestions(false);
        onSearch(query);
    };

    const handleSuggestionClick = (destination) => {
        setQuery(destination.name);
        setShowSuggestions(false);
        onSearch(destination.name);
    };

    const handleTrendingClick = (destination) => {
        setQuery(destination);
        onSearch(destination);
    };

    const handleTypoCorrectionClick = () => {
        setQuery(typoCorrection);
        setShowSuggestions(false);
        onSearch(typoCorrection);
    };

    return (
        <div className="hero-search-wrapper" ref={searchRef}>
            {/* Main Search Bar */}
            <div className="hero-search-container">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    className="hero-search-input"
                    placeholder="Where do you want to explore?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query && setShowSuggestions(true)}
                />
                {query && (
                    <button
                        className="clear-btn"
                        onClick={() => {
                            setQuery('');
                            setSuggestions([]);
                            setShowSuggestions(false);
                        }}
                        aria-label="Clear search"
                    >
                        <X size={18} />
                    </button>
                )}
                <button
                    className="hero-search-btn"
                    onClick={handleSearch}
                    disabled={!query.trim()}
                >
                    Search
                </button>
            </div>

            {/* Autocomplete Dropdown */}
            {showSuggestions && (
                <div className="autocomplete-dropdown">
                    {/* Typo Correction */}
                    {typoCorrection && (
                        <div className="typo-correction">
                            Did you mean{' '}
                            <span
                                className="typo-suggestion"
                                onClick={handleTypoCorrectionClick}
                            >
                                {typoCorrection}
                            </span>?
                        </div>
                    )}

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                        <div className="suggestions-list">
                            {suggestions.map((dest, index) => (
                                <div
                                    key={dest._id}
                                    className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                                    onClick={() => handleSuggestionClick(dest)}
                                >
                                    <Search size={16} className="suggestion-icon" />
                                    <div className="suggestion-content">
                                        <div className="suggestion-name">{dest.name}</div>
                                        <div className="suggestion-location">{dest.location}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Loading state */}
                    {isSearching && (
                        <div className="searching-state">Searching...</div>
                    )}

                    {/* No results */}
                    {!isSearching && suggestions.length === 0 && !typoCorrection && query && (
                        <div className="no-results">
                            No destinations found for "{query}"
                        </div>
                    )}
                </div>
            )}

            {/* Trending Chips */}
            <div className="trending-chips">
                <TrendingUp size={16} className="trending-icon" />
                <span className="trending-label">Trending:</span>
                {trendingDestinations.map((dest) => (
                    <button
                        key={dest}
                        className="trending-chip"
                        onClick={() => handleTrendingClick(dest)}
                    >
                        {dest}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HeroSearch;
