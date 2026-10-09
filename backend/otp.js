//verification code character limit
const Verify = document.getElementById('verify');

Verify.addEventListener('beforeinput', function(e) {
    if (e.data && !/\d/.test(e.data)) e.preventDefault();
  });   

Verify.addEventListener('input', function() {
  this.value = this.value.replace(/\D/g, '').slice(0, 6);
});   