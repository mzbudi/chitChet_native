import { appFirebase } from '../../../config/firebase';

export const currentUser = user => {
  return {
    type: 'CURRENT_USER',
    payload: appFirebase.auth().currentUser()
  };
};
