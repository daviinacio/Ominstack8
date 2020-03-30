const { Schema, model } = require('mongoose');


const InstallerSchema = new Schema({
    platform: String,
    version: [Number, Number, Number],
    release_date: { type: Date, default: Date.now },
    link: String,
    minSdkVersion: Number,
    architecture: String
}, {
    timestamps: true
});

module.exports = model('Installer', InstallerSchema);