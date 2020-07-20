const { Schema, model } = require("mongoose")

const validateEmail = function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
};

const doctorSchema = new Schema({
    reg_number: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Please provide a valid email address']
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^(?:\+?88)?01[15-9]\d{8}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    education: {
        type: String,
        required: true,
        trim: true
    },
    passing_year: {
        type: String,
        required: true
    },
    doctor_type: {
        type: String,
        enum: ["bds", "mbbs"]
    },
    expertise_area: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        default: "doctor"
    },
    verified: {
        type: Boolean
    },
    hospital: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        timestamps: true
    })

const Doctor = model('doctor', doctorSchema)

module.exports = Doctor;