"use strict";

const watchify = require("watchify");
const browserify = require("browserify");
const browserSync = require("browser-sync").create();
const gulp = require("gulp");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const gutil = require("gulp-util");
const sourcemaps = require("gulp-sourcemaps");
const assign = require("lodash.assign");
const uglify = require("gulp-uglify-es").default;
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const concat = require("gulp-concat");
const filesize = require("gulp-filesize");
const handlebars = require("gulp-hb");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const removeEmptyLines = require("gulp-remove-empty-lines");
const glob = require("glob");
const es = require("event-stream");
const path = require("path");
const aliasify = require("aliasify");
const styleAliases = require('gulp-style-aliases');
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");



const config = {
    debugMode: true,
	src: {
        js: 'src/scripts/*.js',
		html: ['src/html/*.html'],
		scss: ['src/styles/*.scss'],
		css: ['src/styles/*.css'],
		data: ['src/data/**/*.json'],
		images: ['src/assets/images/**/*.{png,jpg,jpeg,gif,svg}'],
		icons: ['src/assets/images/**/*.{png,jpg,jpeg,gif,svg}'],
		video: ['src/assets/video/*.{mp4,webm}'],
        mocks: ['src/mocks/**/*'],

        // Images that should not be controlled by author. Varies by project.
        reservedImages: ['src/assets/images/searchField/*.{png,jpg,jpeg,gif,svg}']
	},
	dest: {
        root: './dist',
		css: './dist/assets/css',
		js: './dist/assets/js',
        images: 'dist/assets/images',
		data: 'dist/assets/data',
		video: ['./dist/assets/video/'],
		mocks: ['./dist/mocks/'],
		aemScripts: '../ui.apps/src/main/content/jcr_root/apps/searchads/clientlibs/site/js',
		aemStyles: '../ui.apps/src/main/content/jcr_root/apps/searchads/clientlibs/site/css',
        aemStylesAuthorMode: '../ui.apps/src/main/content/jcr_root/apps/searchads/clientlibs/author.site/css',

        // AEM disallows "/images" as path name; it is a reserved folder name.
        reservedImages: '../ui.apps/src/main/content/jcr_root/apps/searchads/clientlibs/site/resources',
        reservedImagesAuthorMode: '../ui.apps/src/main/content/jcr_root/apps/searchads/clientlibs/author.site/resources'
	},
	watch: {
		html: ['src/html/**/*.html'],
		partials: ['src/partials/**/**/*.{js,json,hbs}'],
		data: ['src/data/**/*.{js,json}'],
		scss: ['src/**/*.scss'],
        css: ['src/styles/*.css'],
        js: ['src/**/*.js'],
		libs: ['src/scripts/libs/**/*.js'],
		images: ['src/assets/images/**/*.{png,jpg,jpeg,gif,svg}'],
		reservedImages: ['src/assets/images/searchField/*.{png,jpg,jpeg,gif,svg}'],
		reservedImagesAuthorMode: ['src/assets/images/searchField/*.{png,jpg,jpeg,gif,svg}'],
		staticData: ['src/assets/data/**/*.json'],
	  video: ['./src/assets/video/*.{mp4,webm}'],
        mocks: ['./src/mocks/**/*.{json,html}']
	},
	options: {
		scss: {
			style: 'nested',
			sourceComments: false,
			includePaths: [require('@marcom/ac-sasskit').sassPath, 'node_modules/@marcom/ac-localnav/src/scss', 'node_modules/@marcom/ac-scroll-container/src/scss',
            'node_modules/@marcom/ac-tabnav/src/scss','node_modules/@marcom/viewport-emitter/src/scss', 'node_modules/@marcom/ac-modal/src/scss']
		},
        scssBuild: {
            style: 'compressed',
            sourceComments: false
        },
        js: {
            main: 'main.min.js'
        }
	}
};
const aliases = {
    'modules': './src/partials/modules',
    'common': './src/partials/common',
    'wrapper': './src/partials/wrapper'
};

const aliasifyConfig = { aliases };

//Scss function:
function buildScss() {
    return gulp
        .src(config.src.scss)
        .pipe(styleAliases(aliases))
        .pipe(sass(config.options.scss).on("error", sass.logError))
        .pipe(autoprefixer("last 2 version", "> 1%"))

        // Minify CSS
        .pipe(postcss([cssnano()]))
        .pipe(
            rename({
                extname: ".min.css",
            })
        )
        .pipe(gulp.dest(config.dest.css))
        .pipe(filesize())
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
};

//CSS function:
function buildCss() {
    return gulp.src(config.src.css)
		.pipe(gulp.dest(config.dest.css))
		.pipe(filesize())
		.pipe(browserSync.reload({
			stream: true
		}));
}


//Handlebars function:
gulp.task(
    "handlebars",
    gulp.series(concatLibs, function(done) {
        gulp
            .src(config.watch.html)
            .pipe(
                plumber({
                    errorHandler: function(err) {
                        console.log(err);
                        this.emit("end");
                    },
                })
            )
            .pipe(
                handlebars({
                        partials: config.watch.partials,
                        data: config.watch.data,
                    },
                    function(done) {
                        done();
                    }
                )
            )
            .pipe(
                removeEmptyLines({
                    removeComments: true,
                })
            )
            .pipe(gulp.dest(config.dest.root))
            .pipe(browserSync.stream());
        done();
    })
);

//Concatlibs function:
function concatLibs(done) {
    gulp
        .src(config.watch.libs)
        .pipe(concat("lib.min.js"))
        .pipe(gulp.dest(config.dest.js))
        .pipe(filesize())
        .pipe(browserSync.stream());
    done();
};

//Images function:
function images(done) {
    return (
        gulp
        .src(config.src.images)
        // .pipe(imagemin())
        .pipe(gulp.dest(config.dest.images))
        .pipe(browserSync.stream())
    );
    done();
}

// Store separate copies of the reserved images.
function reservedImages(done) {
    return (
        gulp
        .src(config.src.reservedImages)
        .pipe(gulp.dest(config.dest.reservedImages))
        .pipe(browserSync.stream())
    );
    done();
}
function reservedImagesAuthorMode(done) {
    return (
        gulp
        .src(config.src.reservedImages)
        .pipe(gulp.dest(config.dest.reservedImagesAuthorMode))
        .pipe(browserSync.stream())
    );
    done();
}

function mocks(done) {
    return (
        gulp
        .src(config.src.mocks)
        // .pipe(imagemin())
        .pipe(gulp.dest(config.dest.mocks))
        .pipe(browserSync.stream())
    );
    done();
}

//Video function:
function video(done) {
    gulp
        .src(config.src.video)
        .pipe(gulp.dest(config.dest.video))
        .pipe(browserSync.stream());
    done();
}

//Staticdata function:
function staticData(done) {
    gulp
        .src(config.watch.staticData)
        .pipe(gulp.dest(config.dest.data))
        .pipe(browserSync.stream());
    done();
}

//Clean function:
function clean() {
    return del(
        [config.dest.root, config.dest.aemScripts, config.dest.aemStyles, config.dest.aemStylesAuthorMode], {
            force: true,
        }
    );
}

//Watch for changes on files:
function watch() {
    browserSync.init({
        server: {
            baseDir: config.dest.root,
            index: "homepage.html"
        }
    });
    gulp.watch(config.watch.js, buildScripts);
    gulp.watch(config.watch.scss, buildScss);
    gulp.watch(config.watch.css, buildCss);
    gulp.watch(config.watch.libs, concatLibs);
    gulp.watch(config.watch.images, images);
    gulp.watch(config.watch.staticData, staticData);
    gulp.watch(config.watch.mocks, mocks);
    gulp.watch(config.watch.html, gulp.series('handlebars'));
    gulp.watch(config.watch.partials, gulp.series('handlebars'));
    gulp.watch(config.watch.data, gulp.series('handlebars'));
    gulp.watch(config.watch.reservedImages, gulp.parallel(reservedImages, reservedImagesAuthorMode));
}

//Add custom browserify options here
// var customOpts = {
// 	entries: theme.watch.js,
// 	debug: true,
// 	paths: ['./node_modules', './src/js/']
// };

// var opts = assign({}, watchify.args, customOpts);
// var bundler = watchify(browserify(opts)).external('jquery');

let bundlerOpts = assign({}, watchify.args, {
    debug: true,
});

function buildScripts(done) {
    glob(config.src.js, function(err, files) {
        if (err) done(err);
        let tasks = files.map(function(entry) {
            let fileName = path.basename(entry),
                opts = assign({}, bundlerOpts, {
                    entries: [entry],
                });
            // return bundler.bundle()
            return (
                browserify(opts)
                .transform(aliasify, aliasifyConfig)
                .external("jquery")
                .bundle()
                .on("error", gutil.log.bind(gutil, "Browserify Error"))
                .on("update", buildScripts) // on any dep update, runs the bundler
                .on("log", gutil.log)
                .pipe(source(fileName))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(
                    rename({
                        extname: ".min.js",
                    })
                )
                .pipe(
                    sourcemaps.init({
                        loadMaps: true,
                    })
                )
                // Add transformation tasks to the pipeline here.
                .pipe(sourcemaps.write("./"))
                .pipe(gulp.dest(config.dest.js))
                .pipe(
                    browserSync.reload({
                        stream: true,
                    })
                )
            );
        });
        es.merge(tasks).on("end", done);
    });
}

//BuildJS function: To minify script
function buildJs(done) {
    gulp
        .src(config.dest.js + "/*.js")
        .pipe(
            plumber({
                errorHandler: function(err) {
                    console.log(err);
                    this.emit("end");
                },
            })
        )
        .pipe(
            uglify({
                preserveComments: false,
            })
        )
        .pipe(gulp.dest(config.dest.js))
        .pipe(filesize());

    done();
}

//Prod Build
exports.build = gulp.series(
    clean,
    gulp.parallel(
        "handlebars",
        buildScripts,
        buildScss,
        buildCss,
        buildJs,
        images,
        reservedImages,
        reservedImagesAuthorMode,
        video,
        mocks
    ),
    gulp.parallel(copyScriptsToAEM, copyStylesToAEM, copyStylesToAEMAuthorMode),
    function(done) {
        done();
    }
);
//Dev Build
(exports.default = gulp.series(
    clean,
    gulp.parallel(
        "handlebars",
        buildScripts,
        buildScss,
        buildCss,
        concatLibs,
        images,
        reservedImages,
        reservedImagesAuthorMode,
        video,
        mocks
    ),
    gulp.parallel(copyScriptsToAEM, copyStylesToAEM, copyStylesToAEMAuthorMode),
    watch
)),
function(done) {
    done();
};

function copyScriptsToAEM() {
	console.log(`Copying script files to AEM in ${config.dest.aemScripts}`);
	return gulp.src(path.resolve(config.dest.js, '**/*'))
		.pipe(gulp.dest(config.dest.aemScripts));
};
function copyStylesToAEM() {
	console.log(`Copying style files to AEM in ${config.dest.aemStyles}`);
	// return gulp.src(path.resolve(config.dest.css, '**/*')
	return gulp.src(path.resolve(config.dest.css, '**/!(*authormode*)'))
		.pipe(gulp.dest(config.dest.aemStyles));
};

/** Save separate CSS files for use in AEM Authoring Mode if a filename that includes "authormode" is found.
 *  If none is found, copy the standard (Publish Mode) files.
 *  @returns {Object} The function that handles Authoring Mode CSS as applicable.
 */
async function copyStylesToAEMAuthorMode() {
    glob(path.resolve(config.dest.css, '**/*authormode*'), await function(err, matches) {
        const copyPublishModeCSS = () => {
            gulp.src(path.resolve(config.dest.css, '**/*'))
                .pipe(gulp.dest(config.dest.aemStylesAuthorMode));
        },
        copyAuthorModeCSS = () => {
            gulp.src(path.resolve(config.dest.css, '**/*authormode*'))
                .pipe(gulp.dest(config.dest.aemStylesAuthorMode));
            gulp.src(path.resolve(config.dest.css, '**/*sasskit*'))
                .pipe(gulp.dest(config.dest.aemStylesAuthorMode));
        };

        if(err) {
            console.log('Unknown error in searching AEM Authoring Mode version of app.min.css.', err);
        }
        if(matches.length == 0) {
            console.log(`Could not find AEM Authoring Mode version of app.min.css. Copying Publish Mode CSS to ${config.dest.aemStylesAuthorMode}.`);
            return copyPublishModeCSS();
        } else {
            console.log(`Copying Authoring Mode CSS to AEM in ${config.dest.aemStylesAuthorMode}`);
            return copyAuthorModeCSS();
        }
    });
};
