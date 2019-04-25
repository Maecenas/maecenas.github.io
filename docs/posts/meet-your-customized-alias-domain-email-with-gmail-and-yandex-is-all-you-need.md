---

title: Meet your customized alias domain email with Gmail, and Yandex is all you need

date: 2019-02-23 10:45:12
tags: [Email, Email Hosting, Custom Domain Email, Gmail, Yandex]
categories: []
type: post

feed:
  enable: true
  title: Title used in feed
  description: Description used in feed
  image: /public/image.png
  author:
    -
      name: Author
      email: author@doamin.tld
      link: http://doamin.tld
  contributor:
    -
      name: Contributor
      email: contributor@doamin.tld
      link: http://doamin.tld
# 
---

Customized Domain Email = Personal Branding + OpenWeb
<!-- more -->
## Why would you need a domain email?

Surely there’re numerous out-of-the-box email service providers. Why would you want a email at your own domain? It is common for companies to have their unique email account, for branding and managing purposes. For people like you and me, domain email would help your personal branding, and more importantly the free to transfer between mail service providers. Domain email come at zero price, yet paying tribute to the Open Web. I would use my [shawnxli.com](shawnxli.com) and [me@shawnxli.com](mailto:me@shawnxli.com) as example throughout the passage.

## Why Yandex?

Yandex is a Russian Google counterpart. Yandex Connect’s email service meet all my expectations: stable, secure, fast, ad-free, domain email, import/export data, email alias, mass storage, calendar, synchronize, push, IMAP, two-step/ two-factor verification, Yubikey, email forward and filtering… even for advanced security features like SPF, DKIM, DMARC support are all there. Offered at $0 for individual.

## 0. Prerequisite

* A domain (I bought my domain from Tencent Cloud at the price of ~$15 for three years, available to transfer after 60 days.)
* Patience to follow the instructions

## 1. Acting as the main Yandex Account

### 1.1. [Sign-up a main Yandex Account](https://passport.yandex.com/registration)
### 1.2. [Add and verify your domain](https://connect.yandex.com/portal/admin/domains)

First add a DNS TXT record at your domain DNS service provider, delete when the domain is verified.

Then add a [MX record](https://connect.yandex.com/portal/admin/customization/dns) at your domain DNS service provider

### 1.3. [Create a user account](https://connect.yandex.com/portal/admin/structure)

Taken my account for example:

Email: me@shawnxli.com
Department: All employees
Grant admin rights (Optional)

### 1.4. [Set a catch-all address routing](https://connect.yandex.com/portal/admin/customization/mail)

This is meant to redirected all the emails sent to invalid email addresses on your domain.

## 2. Acting as the user Yandex account

### 2.1. [Log-in the user account](http://mail.yandex.com/)

* [Enable IMAP and POP3](https://mail.yandex.com/#setup/client) at:
Mail → All settings → Email clients

* [You may also](http://connect.yandex.com/):
    * Enable app passwords
    * Set up two-factor authentication

## 3. Set Gmail to send and receive email

* [Gmail → Accounts and import → “Send mail as”](https://support.google.com/mail/answer/22370)

```
Mail server address: smtp.yandex.com
Connection security: SSL
Port: 465
Account: your-account@your-domain.com
Password: your-account-password or app-password
```

* [Gmail → Accounts and import → “Import mail and contacts”](https://support.google.com/mail/answer/22370)

```
Mail server address: pop.yandex.com
Connection security: SSL
Port: 995
Account: your-account@your-domain.com
Password: your-account-password or app-password
```

[Useful Resources](https://yandex.com/support/mail/mail-clients.html)

## 4. (Optional) Advanced Security/ Anti-Spamming Setting

* SPF (Not Recommended, [Why?](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/ResourceRecordTypes.html#SPFFormat))
* [DKIM, DMARC](https://connect.yandex.com/portal/admin/customization/dns)

## References

* <https://6ki.org/archives/53>
