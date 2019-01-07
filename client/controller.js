export default function() {
  this.w = false;
  this.a = false;
  this.s = false;
  this.d = false;
  this.mouseButton = false;
  this.space = false;
  this.esc = false;

  this.handleStateChange = function(keyCode, isPressed) {
    switch (keyCode) {
      case 87:
        this.w = isPressed;
        break;
      case 65:
        this.a = isPressed;
        break;
      case 83:
        this.s = isPressed;
        break;
      case 68:
        this.d = isPressed;
        break;
      case 32:
        this.space = isPressed;
        break;
      case 27:
        this.esc = isPressed;
        break;
    }
  };
}
