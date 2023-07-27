const User = require('./User');
const CostOfLiving = require('./costOfLiving');
const Location = require('./Location')

User.hasMany(Location, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Location.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, CostOfLiving, Location };
