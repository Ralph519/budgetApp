import Vue from "vue";
import Vuex from "vuex";
import db from './firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        budgets: [],
        expenses: [],
    },
    mutations: {
        setBudget(state, budget){
            state.budgets = budget
        },
        setExpenses(state, expenses){
            state.expenses = expenses
        }
    },
    actions: {
        async getBudget({commit}) {
            let budgetTmp = []
            await db.collection('budget')
            .where('userEmail','==', db.app.auth().currentUser.email)
            .orderBy('createdDate','desc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach((doc) => {
                  budgetTmp.push({
                      budgetId: doc.id,
                      name: doc.data().name,
                      createdDate: doc.data().createdDate,
                      budget: doc.data().budget
                  })
              })

              commit('setBudget', budgetTmp)
            })
        },
    }

})
