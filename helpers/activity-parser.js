var activityParser = {}

activityParser.ACTION = Object.freeze({
    QUOTE: { type: "QUOTE", desc: "quoted" },
    RT: { type: "RT", desc: "retweeted" },
    REPLY: { type: "REPLY", desc: "mentioned" },
    FOLLOW: { type: "FOLLOW", desc: "followed" },
    FAV: { type: "FAV", desc: "favorited" },
    DM: { type: "DM", desc: "direct messaged" },
    UNKNOWN: { type: "UNKNOWN", desc: "unknown" }
})

activityParser.parse = activity => {
    var result = { action: activityParser.ACTION.UNKNOWN }
    if (activity["tweet_create_events"] != null) {
        const event = activity["tweet_create_events"][0]
        result.source_user = event["user"]["screen_name"]
        result.source_user_id = event["user"]["id_str"]
        result.tweet_id = event["id_str"]
        if (event.hasOwnProperty("retweeted_status")) {
            result.action = activityParser.ACTION.RT
            result.target_user =
                event["retweeted_status"]["user"]["screen_name"]
            result.target_user =
                event["retweeted_status"]["user"]["screen_name"]
            result.text = event["retweeted_status"]["text"]
        } else if (event["is_quote_status"]) {
            result.action = activityParser.ACTION.QUOTE
            result.target_user = event["quoted_status"]["user"]["screen_name"]
            result.text = event["text"]
        } else if (event["in_reply_to_user_id_str"] != null) {
            result.action = activityParser.ACTION.REPLY
            result.target_user = event["in_reply_to_screen_name"]
            result.text = event["text"]
        }
    } else if (activity["follow_events"] != null) {
        const event = activity["follow_events"][0]
        if (activity["for_user_id"] != event["source"]["id"]) {
            result.action = activityParser.ACTION.FOLLOW
            result.source_user = event["source"]["screen_name"]
            result.source_user_id = event["source"]["id"]
            result.target_user = event["target"]["screen_name"]
        }
    } else if (activity["favorite_events"] != null) {
        const event = activity["favorite_events"][0]
        if (activity["for_user_id"] != event["user"]["id_str"]) {
            result.action = activityParser.ACTION.FAV
            result.source_user = event["user"]["screen_name"]
            result.source_user_id = event["user"]["id_str"]
            result.target_user =
                event["favorited_status"]["user"]["screen_name"]
            result.text = event["favorited_status"]["text"]
        }
    } else if (activity["direct_message_events"] != null) {
        const event = activity["direct_message_events"][0]
        if (!event.hasOwnProperty("message_create")) {
            return result
        }
        if (activity["for_user_id"] != event["message_create"]["sender_id"]) {
            result.action = activityParser.ACTION.DM
            result.source_user_id = event["message_create"]["sender_id"]
            result.source_user =
                activity["users"][result.source_user_id]["screen_name"]
            const target_user_id =
                event["message_create"]["target"]["recipient_id"]
            result.target_user =
                activity["users"][target_user_id]["screen_name"]
            result.text = event["message_create"]["message_data"]["text"]
        }
    }
    return result
}

module.exports = activityParser
