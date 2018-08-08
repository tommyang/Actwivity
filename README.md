# Actwivity

Twitter clients are [losing the ability to push notifications](http://apps-of-a-feather.com). The new [Premium Account Activity API](https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium.html) has a free tier that should be enough for personal use.

Based on [twitterdev/account-activity-dashboard](https://github.com/twitterdev/account-activity-dashboard). See its doc for configuration docs. Additional variables include Apple Push Notification related `APN_KEY`, `APN_KEYID`, `APN_TEAMID`, `TEMP_DEVICETOKEN`. See [Apple doc](https://developer.apple.com/documentation/usernotifications/registering_your_app_with_apns).

Currently, only iOS is supported. [Client side repo](https://github.com/tommyang/Actwivity-iOS)
