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
var mainView = app.views.create('.view-main');
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
          app.dialog.alert('Login Successfully');
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
 