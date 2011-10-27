
{Deferred} = jQuery

test -> equality 5, 5
test -> equality {}, {}
test -> equality (new Deferred -> @resolve 5), 5
test -> equality 5, (new Deferred -> @resolve 5)
test -> equality (new Deferred -> @resolve 5), (new Deferred -> @resolve 5)

test 'simple array round-trip', ->
  equality (new Asinq [1, 2, 3, 4, 5]).toArray(),
           [1, 2, 3, 4, 5]

test -> equality (new Asinq [1, 2, 3, 4, 5]).length(),
                 5
test -> equality (new Asinq [1, 2, 3, 4, 5]).next(),
                 1

test '.map()', ->
  equality (new Asinq [1, 2, 3, 4, 5]).map((x) -> x * 2),
           [2, 4, 6, 8, 10]

test 'equality of simple arrays with new omitted', ->
  equality (new Asinq [1, 2, 3]).toArray(),
           (Asinq [1, 2, 3]).toArray()