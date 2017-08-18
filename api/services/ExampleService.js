module.exports = {
  someMethodThatNeedsStubbed: function(success, error) {
    // pretend I'm connecting to an external service that is slow, unavailable, unreliable, etc. and you want to stub a
    // static response in place of during development
    setTimeout(function(){
      success({example: true, realistic: false, mocked: false});
    }, 3000);
  }
}
