const Doctor = require("../../models/doctor")


const createDoctor = async (req, res) => {
    try {
        let message
        const data = new Doctor({
            reg_number: req.body.reg_number,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            education: req.body.education,
            passing_year: req.body.passing_year,
            doctor_type: req.body.doctor_type,
            expertise_area: req.body.expertise_area,
            doctor_type: req.body.doctor_type,
        })

        let newData = await data.save()

        res.status(200).json({
            message: "success",
            newData
        })

    } catch (error) {
        if (error) {
            res.status(500).json({
                message: error
            })
        }
    }
}


const doctorsList = async (req, res) => {
    try {
        let doctors
        let message
        let doctorAll = Doctor.find().sort({ _id: -1 })
        res.status(200).json({
            doctors: doctorAll
        })
    } catch (error) {
        if (error) {
            res.status(500).json({
                message: error
            })
        }
    }
}


module.exports = {
    createDoctor,
    doctorsList
}