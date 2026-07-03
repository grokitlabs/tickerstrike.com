# tickerstrike.com

Landing page for TickerStrike, built with Jekyll and deployed to GitHub Pages via GitHub Actions.

## Setup

1. Push this repo to GitHub as `tickerstrike.com` (branch `main`).
2. In repo **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Custom domain is handled by the `CNAME` file (`tickerstrike.com`). Enable **Enforce HTTPS** once DNS is verified.
4. Waitlist form: create a free form at [formspree.io](https://formspree.io) and replace `YOUR_FORM_ID` in `index.html`.

## Local development

```sh
bundle install
bundle exec jekyll serve
```

Site runs at http://localhost:4000.
