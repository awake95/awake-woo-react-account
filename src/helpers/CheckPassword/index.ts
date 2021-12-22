export const check_password_strength = (passwordValue:string, blacklist = ['123', 'abc', 'hello', 'admin']):string => {
  const wp = window.wp || null;
  if (wp) {
    let blacklist_Words = [...blacklist, ...wp.passwordStrength.userInputDisallowedList()],
      strength,
      password_length = wp.passwordStrength.meter( passwordValue, blacklist_Words );

    switch ( password_length ) {
      case 2:
        strength = 'weak';
        break;

      case 3:
        strength = 'good';
        break;

      case 4:
        strength = 'strong';
        break;

      case 5:
        strength = 'short';
        break;

      default:
        strength = 'short';
    }

    return strength;
  }
}
