const HabitsList = require('../models/habits');
const cron = require('node-cron');  // Node cron library for scheduling tasks (use node cron guru website for quickly getting templates for interval)

// Controller for rendering the home page
module.exports.home = async function(req, res){

    // Using node cron scheduler to insert a new date for tracking habits

    cron.schedule('0 0 * * *', async () => {
        const d = new Date();
        const day = d.getDate();
        const month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
        const year = d.getFullYear();

        // Creating a date object similar to our dates array object in HabitsList and populating it with a new date
        const date = { 
            day: day,
            month: month,
            year: year, 
            status: "none"
        };

        const filter = { };
        const options = { upsert: true };
        const updateDoc = {
            $addToSet: {
                dates: date
            },
        };
        const result = await HabitsList.updateMany(filter, updateDoc, options);

        console.log('Updated a new date after 12 am');
    });

    const data = await HabitsList.find();

    return res.render('homePage', {
        title: "Home",
        HabitsList: data
    });
};

// Controller for adding a new habit
module.exports.addHabit = async function(req, res){
    console.log(req.body.habit);
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    const year = d.getFullYear();

    let isHabit = await HabitsList.create({
        name: req.body.habit,
        desc: req.body.desc,
        dates : {
            day: day,
            month: month,
            year: year,
            status : "none"
        }
    });

    if (isHabit) {
        console.log('Updated to MongoDB');
    } else {
        console.log('Not updated to MongoDB');
    }

    return res.redirect('back');
};

// Controller for updating the habit status
module.exports.habitStatus = async function(req, res){
    const { habit_id, date_id, mark } = req.params;

    const isHabit = await HabitsList.find({_id: habit_id});
    let dates;
    isHabit.forEach(element => {
        dates = element.dates;
    });

    const objIndex = dates.findIndex((obj => obj._id == date_id));

    dates[objIndex].status = mark;

    if (isHabit) {
        const filter = { _id: habit_id };
        const options = { upsert: true };
        const updateDoc = {
            $set: {
                dates: dates
            },
        };
        const result = await HabitsList.updateOne(filter, updateDoc, options);    // Updating status in the date array of HabitsList
    }

    return res.redirect('back');
};

// Controller for deleting a habit
module.exports.deleteHabit = async function(req, res){
    console.log(req.params.id);
    await HabitsList.findByIdAndRemove(req.params.id);
    return res.redirect('back');
};
