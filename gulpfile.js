/*
* Base Gulp.js workflow
* for simple front-end projects
* author: Aaron John Schlosser
* url: http://www.aaronschlosser.com
*/

var gulp 				= require("gulp"),
	gutil				= require("gulp-util"),
	watch				= require("gulp-watch"),
	axis				= require("axis-css"),
	accord				= require("gulp-accord"),
	rupture 			= require("rupture"),
	jade				= require("gulp-jade-php"),
	plumber				= require("gulp-plumber")
	changeExtension			= require("gulp-ext-replace")

var paths = {
	styles: {
		src: "./styl/**/*.styl",
		dest: "./stylesheets"
	},
	templates: {
		src: "./templates/*.jade",
		dest: "./"
	}
};

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task("styles", function() {
	return gulp.src(paths.styles.src)
		.pipe(plumber())
		.pipe(accord('stylus', {use:[axis(),rupture()]}))
		.on('error', handleError)
		.pipe(plumber.stop())
		.pipe(changeExtension('.css'))
		.pipe(gulp.dest(paths.styles.dest));
});

gulp.task("templates", function() {
  gulp.src(paths.templates.src)
  	.pipe(plumber())
	.pipe(jade())
	.pipe(plumber.stop())
	.pipe(gulp.dest(paths.templates.dest));
});

gulp.task("default", function() {
	gulp.watch(paths.styles.src, ["styles"]);
	gulp.watch(paths.templates.src, ["templates"]);
});
