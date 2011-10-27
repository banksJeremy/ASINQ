(function() {
  var deferred, root;
  var __slice = Array.prototype.slice;

  root = this;

  deferred = function(x) {
    var _ref, _ref2;
    if ((('function' === (_ref2 = typeof x.then) && _ref2 === (_ref = typeof x.done)) && _ref === typeof x.fail)) {
      return x;
    } else {
      console.log(x);
      return jQuery.Deferred(function() {
        return this.resolve(x);
      });
    }
  };

  root.runTest = function(path) {
    return jQuery(function($) {
      var body, script, testResults, tests;
      body = $("body");
      tests = [];
      testResults = null;
      root.test = function() {
        var args, name, test;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        name = typeof args[0] === 'string' ? args.shift() : 'test something';
        return tests.push([name, test = args.shift()]);
      };
      root.equality = function(left, right) {
        left = deferred(left);
        right = deferred(right);
        return left.then(function(leftValue) {
          return right.then(function(rightValue) {
            if (_.isEqual(leftValue, rightValue)) {
              return testResults.resolve();
            } else {
              return testResults.reject("(" + leftValue + ") != (" + rightValue + ")");
            }
          }, function(error) {
            return testResults.reject("right-hand value rejected. " + error);
          });
        }, function(error) {
          return testResults.reject("left-hand value rejected. " + error);
        });
      };
      script = document.createElement('script');
      script.src = path;
      document.body.appendChild(script);
      return $(script).load(function() {
        var runNextTest;
        return (runNextTest = function() {
          var currentTest, name, _ref;
          delete root.onerror;
          if (!tests.length) return;
          _ref = tests.shift(), name = _ref[0], currentTest = _ref[1];
          testResults = new jQuery.Deferred;
          setTimeout(testResults.reject, 500);
          testResults.then(function() {
            body.append($('<p>').text("" + name + " passed."));
            return setTimeout(runNextTest, 0);
          }, function(error) {
            body.append($('<p>').text("" + name + " failed: " + error));
            return setTimeout(runNextTest, 0);
          });
          try {
            currentTest();
          } catch (e) {
            testResults.reject(String(e));
          }
          return root.onerror = function(msg, path, line) {
            testResults.reject("" + msg + " at " + path + ":" + line);
            return true;
          };
        })();
      });
    });
  };

}).call(this);
