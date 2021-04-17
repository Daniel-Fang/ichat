import Vue from 'vue';
import Vuex from 'vuex';
import Chat from '@/utils/chatLib';
import { MutationTypes } from './mutation-types';

Vue.use(Vuex);

let chat: Chat | null = null;

export default new Vuex.Store({
  state: {

  },
  mutations: {
  },
  actions: {
    initWebsocket ({ commit }) {
      return new Promise((resolve, reject) => {
        if (!chat || !chat.isReady()) {
          chat = new Chat();
          chat.promise.then(ws => {
            ws.onMessage((result: any) => {
              console.log(result);
              commit({
                type: MutationTypes.ReceiveMessage,
                result: result
              })
            })
            resolve(ws);
          }).catch(err => {
            reject(err);
          })
        }
      });
    }
  },
  modules: {
  }
})
