# Case result illustrations

These editable SVG sources visualize the synthetic examples in the corresponding
articles. They are **not product screenshots**; that label is visible in both the
image and its article caption. Original showcase screenshots remain separate
`showcase-view.*` assets and retain source captions.

To regenerate an article's PNG after editing its SVG, use librsvg:

```sh
rsvg-convert site/illustrations/zh-CN/delivery-bot.svg -o content/zh-CN/showcases/delivery-bot/assets/result-preview.png
rsvg-convert site/illustrations/en-US/delivery-bot.svg -o content/en-US/showcases/delivery-bot-en/assets/result-preview.png
```

The site consumes the checked-in PNGs; librsvg is not needed to build or deploy it.
