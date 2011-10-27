root = @

deferred = (x) ->
  if 'function' is typeof x.then is typeof x.done is typeof x.fail
    x
  else
    console.log x
    jQuery.Deferred -> @resolve x

root.runTest = (path) ->
  jQuery ($) ->
    body = $("body")
    tests = []
    testResults = null
    
    root.test = (args...) ->
      name = if typeof args[0] is 'string'
        args.shift()
      else
        'test something'
      tests.push [name, test = args.shift()]
    
    root.equality = (left, right) ->
      left = deferred left
      right = deferred right
      left.then (leftValue) ->
        right.then (rightValue) ->
          if _.isEqual leftValue, rightValue
            testResults.resolve()
          else
            testResults.reject "(#{leftValue}) != (#{rightValue})"
        , (error) ->
          testResults.reject "right-hand value rejected. #{error}"
      , (error) ->
        testResults.reject "left-hand value rejected. #{error}"
    
    script = document.createElement 'script'
    script.src = path
    document.body.appendChild script
    
    $(script).load ->
      do runNextTest = ->
        delete root.onerror
        
        return if not tests.length
      
        [name, currentTest] = tests.shift()
        testResults = new jQuery.Deferred
        
        setTimeout testResults.reject, 500
        
        testResults.then ->
          body.append $('<p>').text "#{name} passed."
          setTimeout runNextTest, 0
        , (error) ->
          body.append $('<p>').text "#{name} failed: #{error}"
          setTimeout runNextTest, 0
        
        try
          currentTest()
        catch e
          testResults.reject String e
        
        root.onerror = (msg, path, line) ->
          testResults.reject "#{msg} at #{path}:#{line}"
          true
