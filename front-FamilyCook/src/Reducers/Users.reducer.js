export default function user(user = null, action) {
  if (action.type === 'user') {
    const User = {
      name: action.user.name,
      firstName: action.user.firstName,
      _id: action.user._id,
      color: action.user.color,
    };
    return User;
  } else if (action.type === 'deconnexion') {
    return {};
  } else {
    return user;
  }
}
