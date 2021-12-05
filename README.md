# Awake Woo Ajax (infinite scroll for woocommerce products)

### Options
1. Enable infinite scroll 
2. Fetch all products 
3. Change page url 
4. Hide pagination 
5. Add custom spinner image 
6. Add load more button text 
7. Choose animation

### Options info
1. Enable infinite scroll - hide button `load-more` and products will appear on `scrolling` to the bottom of products
2. Fetch all products - all products will appear after page loaded with interval, `infinite scroll will not work`
3. Change page url - page url will concat with '/page/{number}' after products loaded
4. Hide pagination - hide `pagination` on page (product category or shop page)
5. Add custom spinner image - adding `custom image` instead of native `spinner`
6. Add load more button text - change text of `load-more` button
7. Choose animation - select `animation` of appeared products 

### Notes
- This plugin will work only on shop page and category pages of native woocommerce pages
- If `fetch all products` option enabled - it will turn off `infinite scroll` option
- This plugin using gulp for developing
  - First ( in first opening project) - use `npm install` in terminal
  - For rebuild scss and js - use command `npm start`

### Change log
- 1.1 Version
   - Added new options in plugin, send options to frontend in localize object
   - Added styling for backend form
   - Added tooltips in backend form
   - Spinner feature implemented, custom spinner implemented
   - Animations added
   - Language support added
   - Added possibility to remove spinner image from backend options page
- 1.0 Version
   - Added plugin files to repo
   - Added basic logic for plugin
