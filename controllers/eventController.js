const Event = require('../models/Event');
const User = require('../models/User');

// create event with basic validation
exports.createEvent = async (req, res) => {
  try {
    const { capacity } = req.body;

    // capacity valid range check
    if (capacity <= 0 || capacity > 1000) {
      return res.status(400).json({ error: 'Capacity should be between 1 and 1000' });
    }

    const event = new Event(req.body);
    await event.save();

    return res.status(201).json({ eventId: event._id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// get event + users info
exports.getEventDetails = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('registrations');

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.json(event);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// register user with multiple validations
exports.registerForEvent = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);
    const user = await User.findById(userId);

    // check user & event exists
    if (!event || !user) {
      return res.status(404).json({ error: 'User or event not found' });
    }

    // event already done?
    if (event.datetime < new Date()) {
      return res.status(400).json({ error: 'Cannot register for a past event' });
    }

    // already registered check
    if (event.registrations.includes(userId)) {
      return res.status(400).json({ error: 'User already registered for this event' });
    }

    // capacity full?
    if (event.registrations.length >= event.capacity) {
      return res.status(400).json({ error: 'Event has reached maximum capacity' });
    }

    event.registrations.push(userId);
    await event.save();

    return res.json({ message: 'Registration successful' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// cancel user's registration
exports.cancelRegistration = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const index = event.registrations.indexOf(userId);

    if (index === -1) {
      return res.status(400).json({ error: 'User is not registered for this event' });
    }

    // remove user from list
    event.registrations.splice(index, 1);
    await event.save();

    return res.json({ message: 'Registration cancelled successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// get only future events, sorted
exports.listUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({ datetime: { $gt: new Date() } });

    // sort: by date > location
    events.sort((a, b) => {
      if (a.datetime < b.datetime) return -1;
      if (a.datetime > b.datetime) return 1;
      return a.location.localeCompare(b.location);
    });

    return res.json(events);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// stats of event: total, left, percent
exports.eventStats = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const total = event.registrations.length;
    const remaining = event.capacity - total;
    const percentUsed = ((total / event.capacity) * 100).toFixed(2);

    return res.json({
      totalRegistrations: total,
      remainingCapacity: remaining,
      percentUsed
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
