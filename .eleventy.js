const sharp = require('sharp')

module.exports = function(eleventyConfig){
  eleventyConfig.addPassthroughCopy('src/assets/images');
  eleventyConfig.addPassthroughCopy('src/assets/js');
  // Watch CSS files for changes
  eleventyConfig.setBrowserSyncConfig({
		files: './_site/css/**/*.css'
	});
  // Obtain the `year` from the template
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Generate favicon from svg input
  // Only run on production build
  // if (process.env.NODE_ENV === 'build') {
    eleventyConfig.on('eleventy.before', async () => {
      console.log('[11ty] Generating Favicon')
      await sharp('src/assets/images/favicon.svg')
        .png()
        .resize(96, 96)
        .toFile('_site/assets/images/icon-96x96.png')
        .catch(function (err) {
          console.log('[11ty] ERROR Generating favicon')
          console.log(err)
        })
    })
  // }
  eleventyConfig.watchIgnores.add('_site/assets/images/icon-96x96.png')

    return {
      dir: {
        input: "src",
        data: "_data",
        includes: "_includes",
        layouts: "_layouts"
      }
    };
  
    
  }
  
  
