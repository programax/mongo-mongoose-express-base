const mongoose = require('mongoose');

(async () => {
    try {
        const schema = new mongoose.Schema({
            name: String,
            email: String,
            age: Number,
            date: Date,
            isValid: Boolean,
            orders: [{
                total: Number,
                tax: Number,
            }],
            userAdmin: mongoose.Types.ObjectId,
            user: {
                name: String,
                email: String,
            },
        }, { collection: 'users' });

        const User = mongoose.model('User', schema);

        await mongoose.connect('mongodb://localhost:27017', {
            dbName: 'midb',
            useNewUrlParser: true,
            // user: '',
            // pass: '',
        });

        const user1 = new User({
            name: 'leo',
            email: 'leo@leo.com',
        });

        // await user1.save();

        const user = await User.findOne({ name: 'leo' });

        user.set({
            age: 11,
            date: new Date(),
        });

        await user.save();

        await user.remove();
    } catch (error) {
        console.error(error);
    }
})();
