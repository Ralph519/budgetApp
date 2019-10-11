<template>
    <div class="container mt-5" id="Home">

        <div class="col-md-12">
          <div class="row">
            <div class="card border-success col-md-4 col-sm-4 mb-3">
              <div class="form-group">
                <label for="budgetList">Budget Name</label>
                <select 
                  class="form-control" 
                  id="budgetList" 
                  v-model="selectedBudgetId"
                >
                  <option 
                    v-for="budget in budgets" 
                    :key=budget.budgetId
                    v-bind:value="budget.budgetId"
                  >
                    {{budget.name}}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-12">
          <div class="row">
            
            <div class="card border-success col-md-4 col-sm-4 mb-3">
              <div class="card-header">Budget </div>
              <div class="card-body">
                <div class="form-group">
                  <label class="col-form-label" for="budget">Please enter your budget</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Budget 
                    input" id="budget"
                    v-model="budget"
                  >
                  <button type="button" class="form-control btn btn-success mt-2">Calculate</button>
                </div>
              </div>
            </div>

          </div>          
        </div>

        <div class="col-sm-12 col-md-12">
          <div class="row">
            <div class="col-md-4 text-center">
              <h4 class="text-success">BUDGET</h4>
              <i class="fas fa-money-bill-alt fa-3x text-success"></i>
              <h3 class="text-success">{{budget | formatNumber}}</h3>
              <hr>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-12">
          <div class="row">
            <div class="col-md-4 text-center">
              <h4 class="text-danger">EXPENSES</h4>
              <i class="far fa-credit-card fa-3x text-danger"></i>
              <h3 class="text-danger">{{ttlExpenses | formatNumber}}</h3>
              <hr>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-12">
          <div class="row">
            <div class="col-md-4 text-center">
              <h4 class="text-success">BALANCE</h4>
              <i class="fas fa-dollar-sign fa-3x text-success"></i>
              <h3 class="text-success">{{balance | formatNumber}}</h3>
              <hr>
            </div>
          </div>
        </div>
        

        <div class="col-md-12 col-sm-12">
          <div class="row">
            <div class="card text-white col-md-4 col-sm-4 bg-danger mb-3">
              <div class="card-body">
                <div class="form-group">
                  <label class="col-form-label" for="expensedesc">Decription of expense</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Expense description" 
                    id="expensedesc"
                    v-model="expenseDesc"
                    ref="expenseDesc"
                  >

                  <label class="col-form-label" for="expenseamt">Please enter the amount</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Expense Amount" 
                    id="expenseamt"
                    ref="expenseAmt"
                    v-model.lazy="expenseAmt"
                    v-money="money"
                  >

                  <label class="col-form-label" for="expenseamt">Expense for the day</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="  /  /    " 
                    id="expenseFor"
                    ref="expenseFor"
                    v-model="expenseFor"
                    @keydown.enter="AddNewExpense"
                    v-mask="'##/##/####'"
                  >


                  <button
                    type="button" 
                    class="form-control btn btn-warning mt-2"
                    v-on:click="AddNewExpense"
                  >
                    Add new expense
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12 col-sm-12">
          <div class="row">
            <div class="card border-primary col-md-4 col-sm-4 mb-3">
              <h3 class="card-header">Expenses</h3>
              <div class="card-body">
                <div class="form-group">
                  <ul class="list-group">
                      <li 
                        v-for="expense in expenses"
                        :key=expense.id
                        class="list-group-item"
                      >
                        <span class="text-left"><strong>{{expense.description}}</strong></span>
                        <!-- <br/>
                        <small>{{expense.createdDate}}</small> -->
                        <span style="font-size: 18px;" class="float-right">{{expense.amount | formatNumber}}</span>
                        <p><small>{{expense.createdDate | formatDate}}</small></p>
                      </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

   

      </div>
</template>

<script>
import { mapState } from 'vuex'
import db from '../firebase'
import Swal from 'sweetalert2'
import {mask} from 'vue-the-mask'
import {VMoney} from 'v-money'

export default {
    name: 'home',
    data(){
      return {
        expenses: [],
        selectedBudgetId: '',
        budget: 0.00,
        ttlExpenses: 0.00,
        expenseAmt: 0.00,
        expenseDesc: '',
        balance: 0.00,
        expenseFor: '',
        money: { /* v-money setttings */
          decimal: '.',
          thousands: ',',
          prefix: '',
          suffix: '',
          precision: 2,
          masked: false /* doesn't work with directive */
        },
      }
    },
    created(){
      const t = this
      
      t.loadData()
    },
    computed:  {
        ...mapState(['budgets']),
    },
    methods: {
      loadData(){
        const t = this
        
        let expensesTmp = []

        t.$store.subscribe((mutation, state) => {
          if (mutation.type === 'setBudget') {
            t.selectedBudgetId = state.budgets[0].budgetId
            t.budget = state.budgets[0].budget

            db.collection('expenses')
              .where('budgetId','==', t.selectedBudgetId)
              .orderBy('forDate','desc')
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    expensesTmp.push({
                        id: doc.data().id,
                        amount: parseFloat(doc.data().amount),
                        description: doc.data().description,
                        createdDate: doc.data().forDate.seconds,
                    })
                })

                t.expenses = expensesTmp
                
                t.expenses.forEach(element => {
                  t.ttlExpenses = t.ttlExpenses + parseFloat(element.amount) 
                });
                t.balance = parseFloat(t.budget) - t.ttlExpenses
                // console.log(t.expenses)
            })

          }
        })
      },
      AddNewExpense(){
        const t = this

        if (t.expenseDesc==''){
           Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Expense description should not be blank',
                onAfterClose: () => t.$refs.expenseDesc.focus(),
            })

            return
        }

        if (t.expenseAmt==0){
           Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Expense Amount should not be zero',
                onAfterClose: () => t.$refs.expenseAmt.focus(),
            })

            return
        }

        let newDate = new Date(t.expenseFor)
        let newDateTS = new Date(newDate).getTime() / 1000
        db.collection('expenses')
          .add({
            amount: parseFloat(t.expenseAmt.replace(',','')),
            description: t.expenseDesc,
            forDate: newDate,
            budgetId: t.selectedBudgetId
          })
          .then(docRef => {
            t.expenses.unshift({
                id: docRef.id,
                amount: parseFloat(t.expenseAmt.replace(',','')),
                description: t.expenseDesc,
                createdDate: newDateTS
            })
            t.ttlExpenses = t.ttlExpenses + parseFloat(t.expenseAmt.replace(',',''))
            t.balance = parseFloat(t.budget) - t.ttlExpenses

            t.expenseDesc = ''
            t.expenseAmt = 0
            t.expenseFor = ''

            t.$nextTick(() => {
              t.$refs.expenseDesc.focus()
            })
          })
      }
    },
    directives: {mask, money: VMoney}
}
</script>

<style scoped>
  p small 
  {
      display: block;
  }
</style>