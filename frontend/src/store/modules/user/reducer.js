export default function user(state = { visitante: false }, action) {
  switch (action.type) {
    case 'MENU_VIEW':
      return { visitante: action.visitante };
    default:
      return state;
  }
}
