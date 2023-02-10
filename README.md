# gfilter
Very simple, very hacky and very feature-lacking filter generator for GMail

## Install

```
# <whatever you do to install yarn>
git clone https://github.com/honsiorovskyi/gfilter.git
yarn
```

## Configure

```
cp config.example.js config.js
vim config.js
```

* Read through the example config and adjust it to your taste.
* Don't hesitate looking into index.js too to understand how it works.
* It's tiny but not a great quality code — I wanted to make it fast, sorry for that :)
* Also have a look at filter.xml after the generation, it's big but easy to understand.

## Run

```
yarn start
```

## Configure GMail
* Go to your GMail filter settings
* Import filters
* Select `filter.xml` from the project directory
* Chose filters you want to import
* Don't forget to tick the checkbox if you want to apply it to your existing mail
* Click the final button and wait until it applies all filters (it takes time - that's okay)

## Troubleshoot
If you screwed up somewhere, just delete both the labels and filters you've imported and start from scratch. Be careful with the `read` and `archive` options though, it's hard to reverse them, so better test things with both set to `false`.
