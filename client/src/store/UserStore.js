import { observable, computed } from 'mobx'
import { db, User } from '../firebase'

class UserStore {
  @observable user = {
    email: 'Test'
  }

  @observable isLogin = false

}


const userStore = new UserStore() 
export default userStore