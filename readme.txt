=== Do Not Send Emails If ===
Contributors: sanzeeb3
Tags: emails, disable-emails, restrict-emails, prevent-emails
Requires at least: 4.9
Tested up to: 5.8
Requires PHP: 5.6
Stable tag: 1.0.0
License: GPLv3
License URI: http://www.gnu.org/licenses/gpl-3.0.html

Do not send emails if conditions matches. You set the condition.

== Description ==

**Disable any emails sent from your site as per the condition you set.**

**Do not send emails if**

- **Receipent (To Email)** is/is not/contains/do not contain _something_
- **Email Subject** is/is not/contains/do not contain _something_
- **Email Message** is/is not/contains/do not contain _something_

and many other conditions..

Compatible with WordPress core emails such as New User Registration email, Plugin/Theme Automatic Updates Notification emails etc, WooCommerce emails such as New Order Email, Password Change Email etc.

and with every WordPress plugins sending emails with <code>wp_mail()</code>.

Follow the [documentation](https://sanjeebaryal.com.np/disable-any-emails-sent-from-your-wordpress-site/) for more information.


== Screenshots ==

1. Settings.

== Frequently Asked Questions ==

= How can I disable new user registration email?

Set the condition: _Do not send emails if Email Subject contains New User Registration_.

= How can I disable emails sent to receipents outside of my organization?

Set the condition: _Do not send emails if To Email does not contain @yourdomain.com_

== Changelog ==

= 1.0.0 - 10/28/2021 =
* Initial Release
