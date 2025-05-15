import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Event', eventSchema);
