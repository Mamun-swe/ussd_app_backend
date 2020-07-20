const Doctor = require("../../models/doctor")

function validateCheck(msisdn, service_code) {
    if (msisdn && service_code) {
        return true
    } else {
        return false
    }
}

function validate(phone) {
    var phoneno = /^(?:\+?88)?01[15-9]\d{8}$/;
    if (phone.match(phoneno)) {
        return true
    } else {
        return false
    }
}




const clientRequest = async (req, res, next) => {
    const msisdn = req.query.msisdn
    const service_code = req.query.service_code
    let message

    try {
        var validCheck = await validateCheck(msisdn, service_code)
        var check = await validate(msisdn)
        if (validCheck == true) {
            if (check == true) {
                if (service_code === '*145') {
                    res.status(200).json({
                        message: "Welcome alif"
                    })
                } else if (service_code === '*145*1') {
                    res.status(200).json({
                        message: "you choose medicine doctor"
                    })
                } else if (service_code === '*145*2') {
                    res.status(200).json({
                        message: "you choose surgery doctor"
                    })
                } else if (service_code === '*145*0') {
                    res.status(200).json({
                        message: "application closed"
                    })
                }


            } else {
                res.status(501).json({
                    message: "Phone number isn't valid"
                })
            }
        } else {
            res.status(501).json({
                message: "Please fill-up all field"
            })
        }

    } catch (error) {
        throw error
    }
}


const findDoctor = async (req, res) => {
    try {
        let doctor
        let reg_number = req.query.reg_number

        const result = await Doctor.findOne(
            { reg_number: reg_number },
            {
                _id: 0,
                reg_number: 1,
                name: 1,
                education: 1,
                passing_year: 1,
                doctor_type: 1,
                expertise_area: 1,
                verified: 1,
                hospital: 1
            }
        )
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

module.exports = {
    clientRequest,
    findDoctor
}