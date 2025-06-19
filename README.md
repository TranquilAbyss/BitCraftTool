# WebsiteStarter
A lightweight JavaScript library where HTML is scripted from modules.

Considerations:
- Currently this is a client side only library. No back servers required. This may change.
- This library is build around the concept of no dependencies. Dependency managed frameworks have many strengths and weaknesses. The weaknesses this library are trying to avoid are:
  - Dependencies can limit what is available to changed.
  - Dependencies introduce security vulnerabilities through relying on many third parties. I know that there is benefit to common libraries being tested by large amount of users. But large number of users also causes false confidence in easily available code.
  - Dependency hell, version conflicts between dependencies which becomes a waste of time to manage.
- Modules provide the benefit dependencies, pre made stuff that can be built on top of, but are designed to be smaller packages which can be deleted easily if not being used.

This library is a work in progress.
- Missing shared CSS support, but modules can still have CSS

Demo:
https://tranquilabyss.github.io/WebsiteStarter/
