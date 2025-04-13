import mongoose from 'mongoose';

const ClickSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Url',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String
  },
  browser: {
    type: String
  },
  device: {
    type: String
  },
  os: {
    type: String
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  referrer: {
    type: String
  }
});

export default mongoose.models.Click || mongoose.model('Click', ClickSchema);