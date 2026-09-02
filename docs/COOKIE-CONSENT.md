# Cookies, local storage and consent

BET must maintain an inventory of cookies and equivalent browser storage before public beta.

Categories:
1. Strictly necessary — authentication/session/security and explicit member preferences required to provide the service.
2. Product analytics — optional browser-side activity measurement such as active-time heartbeats/module usage when consent is required by the applicable jurisdiction.
3. Marketing — off by default and not part of launch scope.

The public UI must provide a restrained consent control with Reject non-essential, Accept all and Manage preferences, plus a persistent way to reopen preferences. Non-essential trackers must not load before the required consent. Consent state/version/time must be recorded and withdrawal must be as easy as acceptance.

Do not make the Owner Control Center dependent on third-party advertising cookies. Prefer first-party server events for core product operations and first-party, data-minimized analytics.

This document is an implementation baseline, not jurisdiction-specific legal advice. Before external beta, final Terms/Privacy/Cookie wording and controller identity must be reviewed for the actual launch jurisdictions.
