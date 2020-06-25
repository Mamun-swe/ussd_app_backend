
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


module.exports = {
    clientRequest
}