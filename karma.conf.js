// Karma configuration
// Generated on Thu Sep 10 2015 12:33:09 GMT+0200 (CEST)

module.exports = function (config) {
    config.set({
        customLaunchers: {  
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        }
        
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/**/*.js',
            'src/*_test.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/!(*_test.)js': ['coverage']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/',
            moduleName: 'templates'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        htmlReporter: {
            outputDir: 'unit', // where to put the reports
            templatePath: null, // set if you moved jasmine_template.html
            focusOnFailures: true, // reports show failures on start
            namedFiles: false, // name files instead of creating sub-directories
            pageTitle: null, // page title for reports; browser info by default
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
            reportName: 'spec-report', // report summary filename; browser info by default
            //  reportName: 'node_modules/karma-html-reporter/jasmine_template.html', // report summary filename; browser info by default
            // experimental
            preserveDescribeNesting: false, // folded suites stay folded
            foldAll: false // reports start folded (only with preserveDescribeNesting)
        },

        // optionally, configure the reporter
        coverageReporter: {
            dir: 'test/_coverage',
            reporters: [
                {type: 'html', subdir: 'report-html'},
                {type: 'text-summary'}
            ]
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
       if(process.env.TRAVIS) {  
          browsers = ['Chrome_travis_ci'],
        } else {
            browsers: ['Chrome'],
        }

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        plugins: [
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-jasmine',
            'karma-html-reporter',
            'karma-phantomjs-launcher',
            'karma-ng-html2js-preprocessor'
        ],

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    });
};
