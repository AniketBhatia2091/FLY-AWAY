const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Destination = sequelize.define('Destination', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subtitle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    discount: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: true,
    },
    isBestseller: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    duration: {
        type: DataTypes.JSON, // { days: 5, nights: 4 }
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    groupSize: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    meals: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    highlights: {
        type: DataTypes.JSON, // Array of strings
        allowNull: true,
    },
    originalPrice: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    days: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    itinerary: {
        type: DataTypes.JSON, // Store itinerary as JSON
        allowNull: true,
    },
});

module.exports = Destination;
