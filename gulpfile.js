var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    replace = require('gulp-replace');
    tar     = require('gulp-tar'),
    gzip    = require('gulp-gzip'),
    merge   = require('merge-stream');

var fs            = require('fs'),
    child_process = require('child_process');

gulp.task('docker-osx-dev', function() {
  return gulp.src(['modules/docker-osx-dev'])
     .pipe(replace('handle_command "$@"', ''))
     .pipe(gulp.dest('tmp'))
});

gulp.task('compose', function() {
  return gulp.src(['modules/docker-compose.yml'])
     .pipe(gulp.dest('tmp/dist'))
});

gulp.task('cowboy', function() {
  return gulp.src(['lib/cowboy'])
     .pipe(gulp.dest('tmp'))
});

gulp.task('build', ['cowboy', 'docker-osx-dev'], function() {
  return gulp.src(['tmp/docker-osx-dev', 'tmp/cowboy'])
     .pipe(concat('outlaw'))
     .pipe(gulp.dest('tmp/dist/bin'))
});

gulp.task('package', ['build', 'compose'], function() {
  return gulp.src('tmp/dist/**/*')
        .pipe(tar('outlaw.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('dist'));
});

gulp.task('homebrew', ['package'], function() {
  var outlaw_version = fs.readFileSync('./VERSION').toString().trim();
  var outlaw_digest = child_process.execSync('cat dist/outlaw.tar.gz | openssl dgst -sha256').toString().trim();

  return gulp.src(['outlaw.rb'])
     .pipe(replace("OUTLAW_VERSION = ''", 'OUTLAW_VERSION = "' + outlaw_version + '"'))
     .pipe(replace("OUTLAW_DIGEST = ''", 'OUTLAW_DIGEST = "' + outlaw_digest + '"'))
     .pipe(gulp.dest('dist'))
});

gulp.task('dist', ['homebrew'], function() { });
gulp.task('default', ['dist'], function(){});
