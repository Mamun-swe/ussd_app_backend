const Doctor = require("../../models/doctor")

const createDoctor = async (req, res) => {
    let { reg_number, email, phone } = req.body
    try {

        const doctor = await Doctor.findOne({ $or: [{ reg_number }, { email }, { phone }] }).exec()
        if (doctor) {
            return res.status(409).json({ message: 'exist' })
        }
        const data = new Doctor({
            reg_number: req.body.reg_number,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            education: req.body.education,
            passing_year: req.body.passing_year,
            doctor_type: req.body.doctor_type,
            expertise_area: req.body.expertise_area,
            verified: req.body.verified,
            hospital: req.body.hospital
        })

        let newData = await data.save()

        if (!newData) {
            return res.status(500).json({ message: "failed" })
        }
        res.status(200).json({ message: "success" })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const doctorsList = async (req, res) => {
    try {
        let doctors
        let doctorAll = await Doctor.find({}, { role: 0, createdAt: 0, updatedAt: 0 }).sort({ _id: -1 })
        res.status(200).json({
            doctors: doctorAll
        })
    } catch (error) {
        if (error) {
            res.status(500).json({
                error
            })
        }
    }
}


const doctorView = async (req, res) => {
    try {
        let doctor
        let id = req.params.id

        const result = await Doctor.findById({ _id: id }, { role: 0, createdAt: 0, updatedAt: 0 })
        res.json({
            doctor: result
        })

    } catch (error) {
        if (error) {
            res.status(204).json({
                error
            })
        }
    }
}


const doctorDelete = async (req, res) => {
    try {
        let message
        let id = req.params.id

        const result = await Doctor.findByIdAndRemove({ _id: id })
        res.json({
            message: true
        })

    } catch (error) {
        if (error) {
            res.status(204).json({
                error
            })
        }
    }
}


const doctorUpdate = async (req, res) => {
    let message
    let id = req.params.id
    const data = req.body
    try {
        const result = await Doctor.findByIdAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        )

        res.status(200).json({
            message: true
        })

    } catch (error) {
        if (error) {
            res.status(204).json({
                error
            })
        }
    }
}


// Total doctor count
const doctorCount = async (req, res, next) => {
    try {
        const total = await Doctor.find().count().exec()
        const bds = await Doctor.find({ doctor_type: 'bds' }).count().exec()
        const mbbs = await Doctor.find({ doctor_type: 'mbbs' }).count().exec()

        res.status(200).json({ total, bds, mbbs })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createDoctor,
    doctorsList,
    doctorView,
    doctorDelete,
    doctorUpdate,
    doctorCount
}