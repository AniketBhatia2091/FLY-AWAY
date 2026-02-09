const Destination = require('../models/Destination');

// Get all destinations
exports.getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.findAll({
            attributes: [
                'id', 'name', 'title', 'subtitle', 'image', 'discount', 'rating',
                'isBestseller', 'duration', 'location', 'groupSize', 'meals',
                'highlights', 'originalPrice', 'price'
            ]
        });
        res.json({ success: true, destinations });
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get specific destination by name (including itinerary)
exports.getDestinationByName = async (req, res) => {
    try {
        const { name } = req.params;
        const destination = await Destination.findOne({ where: { name } });

        if (!destination) {
            return res.status(404).json({ success: false, message: 'Destination not found' });
        }

        res.json({ success: true, destination });
    } catch (error) {
        console.error('Error fetching destination:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
