// Dom7
var $$ = Dom7;

// install plugin to Framework7
Framework7.use(Framework7Keypad);

// Init App
var app = new Framework7({
  id: 'com.sample',
  root: '#app',
  theme: 'md',
  name: 'UTS',
  dialog: {
    title: 'UTS',
  },
  routes: routes,
});

// Init/Create main view
//var mainView = app.views.create('.view-main');

var mainView = app.views.create('.view-main', {
  url: '/',
  on: {
    init: function (event, page) {
      var User = localStorage.User;
      if (User) {
        $$('.login-screen-section').hide();
          this.router.navigate({
            name: 'welcome',
          });
      }
      else {
        $$('.login-screen-section').show();
      }
    },
  }
});

var BaseURL = 'http://brandstudioz.co.in/hunt/public/api/';
function login() {
  if ($$('#login-form')[0].checkValidity()) {
    var email = $$('#login-form input[name=email]').val();
    var password = $$('#login-form input[name=password]').val();
    console.log(email);
    var obj = {
      email: email,
      password: password,
    };
    app.request({
      url: BaseURL + 'testing-api',
      method: 'POST',
      dataType: 'json',
      data: obj,
      //contentType: 'application/json',
      beforeSend: function (xhr) {
        var spinnerOptions = { dimBackground: true };
        SpinnerPlugin.activityStart('Loading...', spinnerOptions);
      },
      error: function (xhr, status) {
        alert(statusMessage(status));
      },
      success: function (data, status, xhr) {
        console.log(data);
        if (data.ErrorCode == '0') {
          localStorage.setItem("User", JSON.stringify(data));
          window.plugins.toast.show("Login Success", 'long', 'bottom');
          app.views.main.router.navigate({
            name: 'welcome',
          });
          //app.dialog.alert('Login Successfully');
        }
        else {
          window.plugins.toast.show(data.ErrorMessage, 'long', 'bottom');
          app.dialog.alert(data.ErrorMessage);
        }
      },
      complete: function (xhr, status) {
        SpinnerPlugin.activityStop();
      }
    })
  }
}
function logout() {
  localStorage.removeItem("User");
  app.views.main.router.navigate('/');
}
function shareApp() {
  if (app.device.android) {
    var url = 'https://play.google.com/store/apps/details?id=com.sample';
  }
  if (app.device.ios) {
    var url = 'https://play.google.com/store/apps/details?id=com.sample';
  }
  var options = {
    url: url,
  };
  var onSuccess = function (result) { };
  var onError = function (msg) { };
  window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
}
