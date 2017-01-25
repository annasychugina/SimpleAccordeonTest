var gulp = require("gulp"),
	browserSync = require("browser-sync"),
	concat = require("gulp-concat"),
	cssnano = require("cssnano"),
	rename = require("gulp-rename"),
	del	= require("del"),
	autoprefixer = require("autoprefixer"),
	postcss = require("gulp-postcss"),
	jshint = require('gulp-jshint'),
	imagemin = require("gulp-imagemin");

gulp.task('start', function() {
	return gutil.log('Gulp is running...')
});

gulp.task("css", function() {
	var processors = [
		autoprefixer({
			browsers: ["last 2 version"]
		}),
		cssnano()
	];
	return gulp.src("src/styles/**/*.css")
		.pipe(postcss(processors))
		.pipe(concat("build.min.css"))
		.pipe(gulp.dest("public/styles"))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("fonts", function() {
	return gulp.src("src/fonts/**/*")
		.pipe(gulp.dest("public/fonts"));
});

gulp.task("scripts", function() {
	return gulp.src("src/scripts/**/*")
		.pipe(concat("min.js"))
		.pipe(gulp.dest("public/scripts"))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('lint', function() {
	return gulp.src('src/scripts/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task("html", function() {
	return gulp.src("src/*.html")
		.pipe(gulp.dest("public"))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("img", function() {
	return gulp.src("src/img/*")
		.pipe(imagemin())
		.pipe(gulp.dest("public/img"));
});

gulp.task("browser-sync", function() {
	browserSync({
		server: {
			baseDir: "public"
		},
		notify: false
	});
});

gulp.task("watch", ["browser-sync", "css", "html", "scripts"], function() {
	gulp.watch("src/styles/**/*.css", ["css"]);
	gulp.watch("src/*.html", ["html"]);
	gulp.watch("src/scripts/**/*.js", ["js"]);
});

gulp.task("build", ["clean", "css", "fonts", "scripts", "html", "img", "lint"], function() {
	return gulp.src("src/styles/*min.css")
		.pipe(gulp.dest("public/styles"));
});

gulp.task("clean", function() {
	return del.sync("public/*");
});

gulp.task("dev", ["build", "browser-sync", "watch"]);
gulp.task("default", ["build"]);