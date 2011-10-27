(function() {
  var Deferred;

  Deferred = jQuery.Deferred;

  test(function() {
    return equality(5, 5);
  });

  test(function() {
    return equality({}, {});
  });

  test(function() {
    return equality(new Deferred(function() {
      return this.resolve(5);
    }), 5);
  });

  test(function() {
    return equality(5, new Deferred(function() {
      return this.resolve(5);
    }));
  });

  test(function() {
    return equality(new Deferred(function() {
      return this.resolve(5);
    }), new Deferred(function() {
      return this.resolve(5);
    }));
  });

  test('simple array round-trip', function() {
    return equality((new Asinq([1, 2, 3, 4, 5])).toArray(), [1, 2, 3, 4, 5]);
  });

  test(function() {
    return equality((new Asinq([1, 2, 3, 4, 5])).length(), 5);
  });

  test(function() {
    return equality((new Asinq([1, 2, 3, 4, 5])).next(), 1);
  });

  test('.map()', function() {
    return equality((new Asinq([1, 2, 3, 4, 5])).map(function(x) {
      return x * 2;
    }), [2, 4, 6, 8, 10]);
  });

  test('equality of simple arrays with new omitted', function() {
    return equality((new Asinq([1, 2, 3])).toArray(), (Asinq([1, 2, 3])).toArray());
  });

}).call(this);
