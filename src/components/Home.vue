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
                  @change="getBudget"
                >
                  <option 
                    v-for="budget in budgets" 
                    :key=budget.budgetId
                    v-bind:value="budget.budgetId"
                  >
                    {{budget.name}}
                  </option>
                </select>
                <small class="text-right"><a href="#!" @click="showNewBudgetModal">Create New Budget</a></small>
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
                    v-model.lazy="budget"
                    @focus="$event.target.select()"
                  >
                  <button type="button" class="form-control btn btn-success mt-2" @click="updateBudget">Calculate</button>
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
              <h4 v-if="balance>0" class="text-success">BALANCE</h4>
              <h4 v-else class="text-danger">BALANCE</h4>
              <i v-if="balance>0" class="fas fa-dollar-sign fa-3x text-success"></i>
              <i v-else class="fas fa-dollar-sign fa-3x text-danger"></i>
              <h3 v-if="balance>0" class="text-success">{{balance | formatNumber}}</h3>
              <h3 v-else class="text-danger">{{balance | formatNumber}}</h3>
              <hr>
            </div>
          </div>
        </div>
        

        <div class="col-md-12 col-sm-12">
          <div class="row">
            <div class="card text-white col-md-4 col-sm-4 bg-danger mb-3">
              <div class="card-body">
                <div class="form-group">
                  <label class="col-form-label" for="expensedesc">Description of expense</label>
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
            <div class="card border-danger col-md-4 col-sm-4 mb-3">
              <h3 class="card-header text-secondary">Expenses</h3>
              <div class="card-body">
                <div class="col-md-12 border-bottom mt-1" v-for="(expense, index) in expenses" :key=expense.id>
                  <span class="text-left"><strong>{{expense.description}}</strong></span>
                  <span style="font-size: 18px;" class="float-right">
                    {{expense.amount | formatNumber}} 
                    <a href="#!" 
                      class="ml-3 text-danger" 
                      @click="DeleteExpense(expense.id, index)">
                      <i class="far fa-trash-alt"></i>
                    </a>
                  </span>
                  <p><small>{{expense.createdDate | formatDate}}</small></p>
                </div>
                <div v-if="expenses.length<=0" class="col-md-12">
                  <span><p class="text-danger">No expenses for this budget yet</p></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- New Budget Modal -->

        <modal
            name="newBudgetModal"
            transition="nice-modal-fade"
            height="auto"
            :width="350"
            :delay="100"
        >
            <div class="card border-secondary">
                <div class="card-header pt-3">
                    <h5 class="card-title text-primary">
                        Add New Budget
                        <button
                            type="button"
                            class="close"
                            @click="hideNewBudgetModal"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </h5>
                </div>
                <div class="card-body mb-5">
                    <small>
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="newBudgetName"><i class="fas fa-file-invoice-dollar mr-2"></i>Budget Name</label>
                                        <input 
                                            type="newBudgetName" 
                                            name="newBudgetName" 
                                            id="newBudgetName" 
                                            class="form-control form-control-sm"
                                            placeholder="Budget Name"
                                            @focus="$event.target.select()"
                                            ref="newBudgetName"
                                            autocomplete="off"
                                            v-model="newBudgetName"
                                        >
                                    </div>    
                                    <div class="form-group">
                                        <label for="newBudget"><i class="fas fa-hand-holding-usd mr-2"></i>Budget Amount</label>
                                        <input 
                                            type="newBudget" 
                                            name="newBudget" 
                                            id="newBudget" 
                                            class="form-control form-control-sm"
                                            placeholder="Budget Amount"
                                            @focus="$event.target.select()"
                                            ref="newBudget"
                                            autocomplete="off"
                                            v-model="newBudget"
                                        >
                                    </div>    
                                </div>
                            </div>
                        </div>
                      

                        <div class="col-md-12">
                            <button 
                                class="btn btn-primary form-control"
                                @click="AddNewBudget"
                            >
                                Add New Budget
                            </button>
                        </div>

                    </small>
                </div>

            </div>
        </modal>

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
        newBudget: 0.00,
        newBudgetName: '',
      }
    },
    created(){
      const t = this
      
      t.subscribeToBudgetData()
    },
    mounted(){
      const t = this

      t.subscribeToBudgetData()
    },
    computed:  {
        ...mapState(['budgets']),
    },
    methods: {
      getBudget(){
        const t = this;

        t.budget = 0.00

        db.collection('budget')
          .doc(t.selectedBudgetId)
          .get()
          .then(snapshot => {
            if(snapshot.exists){
              t.budget = parseFloat(snapshot.data().budget)
              t.loadExpenseData()
            }
          })

      },  
      updateBudget(){
        const t = this;

        db.collection('budget')
          .doc(t.selectedBudgetId)
          .update('budget',t.budget)
        t.loadExpenseData()

        Swal.fire(
          'Updated!',
          'New budget have been applied',
          'success'
        )
      },
      loadExpenseData(){
        const t = this
        
        t.expenses = []
        
        t.balance = 0.00
        t.ttlExpenses = 0.00

        let expensesTmp = []

        db.collection('expenses')
          .where('budgetId','==', t.selectedBudgetId)
          .orderBy('forDate','desc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                expensesTmp.push({
                    id: doc.id,
                    amount: parseFloat(doc.data().amount),
                    description: doc.data().description,
                    createdDate: doc.data().forDate.seconds,
                })
            })

            t.expenses = expensesTmp

            t.calcExpenses()
        })

      },
      AddNewBudget(){
        const t = this

        if (t.newBudgetName==''){
           Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Budget Name must not be blank',
                onAfterClose: () => t.$refs.newBudgetName.focus(),
            })

            return
        }

        if (t.newBudget==0){
           Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Budget Amount must not be zero',
                onAfterClose: () => t.$refs.newBudget.focus(),
            })

            return
        }

        let newDate = new Date()
        let newDateTS = new Date(newDate).getTime() / 1000
        db.collection('budget')
          .add({
            budget: parseFloat(t.newBudget),
            createdDate: newDate,
            name: t.newBudgetName,
            userEmail: db.app.auth().currentUser.email
          })
          .then(docRef => {

            t.selectedBudgetId = docRef.id

            t.$store.state.budgets.unshift({
              budget: t.newBudget,
              createdDate: newDateTS,
              budgetId: docRef.id,
              name: t.newBudgetName
            })

            t.budget = t.newBudget
            t.expenses = []
            t.balance = 0.00
            t.ttlExpenses = 0.00
          })
        
        
        t.hideNewBudgetModal()
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
      },
      DeleteExpense(expenseId, index) {
        const t = this;

        Swal.fire({
          title: 'Are you sure?',
          text: "Continue deleting this expense?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {

            db.collection('expenses').doc(expenseId).delete()

            t.expenses.splice(index,1)
            t.calcExpenses()
          }
        })
      },
      subscribeToBudgetData(){
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
                        id: doc.id,
                        amount: parseFloat(doc.data().amount),
                        description: doc.data().description,
                        createdDate: doc.data().forDate.seconds,
                    })
                })

                t.expenses = expensesTmp

                t.calcExpenses()
            })

          }
        })
      },
      calcExpenses(){
        const t = this
        t.ttlExpenses = 0
        t.expenses.forEach(element => {
          t.ttlExpenses = t.ttlExpenses + parseFloat(element.amount) 
        });
        t.balance = parseFloat(t.budget) - t.ttlExpenses
      },
      hideNewBudgetModal() {
        this.$modal.hide('newBudgetModal')
      },
      showNewBudgetModal() {
        const t = this

        t.$modal.show('newBudgetModal')       
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