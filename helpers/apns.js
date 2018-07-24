const apn = require("apn")

require('dotenv').config()

var apns = {}

const options = {
    token: {
        key: process.env.APN_KEY,
        keyId: process.env.APN_KEYID,
        teamId: process.env.APN_TEAMID
    },
    production: false
}

apns.apnProvider = new apn.Provider(options)

apns.buildNotification = parsedActivity => {
    var notification = new apn.Notification()
    notification.topic = "org.tommyang.Actwivity-iOS"
    notification.expiry = Math.floor(Date.now() / 1000) + 3600
    notification.aps.category = parsedActivity.action.type
    notification.title = `@${parsedActivity.acting_user} ${
        parsedActivity.action.desc
    } you [${parsedActivity.target_user}]`
    notification.body = `${parsedActivity.text}`
    // notification.threadId = ""
    // notification.payload = {
    // }
    return notification
}

apns.sendNotification = (parsedActivity, deviceToken) => {
    deviceToken = process.env.TEMP_DEVICETOKEN // FIXME: rm
    apnProvider
        .send(apns.buildNotification(parsedActivity), deviceToken)
        .then(response => {
            response.sent.forEach(token => {
                // success
            })
            response.failed.forEach(failure => {
                if (failure.error) {
                    console.log(failure.error)
                } else {
                    console.log(failure.response)
                    // TODO
                }
            })
        })
}

module.exports = apns
