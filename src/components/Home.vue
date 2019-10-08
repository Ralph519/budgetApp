<template>
    <div class="container mt-5" id="Home">

        <div class="col-md-12">
          <div class="row">
            <div class="card border-success col-md-4 col-sm-4 mb-3">
              <div class="form-group">
                <label for="budgetList">Budget Name</label>
                <select class="form-control" id="budgetList" v-model="selectedBudgetId" >
                  <option 
                    v-for="budget in budgets" 
                    :key=budget.budgetId
                    v-bind:value="budget.budgetId"
                    @change="checkData()"
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
                  <input type="text" class="form-control" placeholder="Budget input" id="budget">
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
              <h3 class="text-success">5,000</h3>
              <hr>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-12">
          <div class="row">
            <div class="col-md-4 text-center">
              <h4 class="text-danger">EXPENSES</h4>
              <i class="far fa-credit-card fa-3x text-danger"></i>
              <h3 class="text-danger">2,500</h3>
              <hr>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-12">
          <div class="row">
            <div class="col-md-4 text-center">
              <h4 class="text-success">BALANCE</h4>
              <i class="fas fa-dollar-sign fa-3x text-success"></i>
              <h3 class="text-success">2,500</h3>
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
                  <input type="text" class="form-control" placeholder="Expense description" id="expensedesc">

                  <label class="col-form-label" for="expenseamt">Please enter the amount</label>
                  <input type="text" class="form-control" placeholder="Expense Amount" id="expenseamt">
                  <button type="button" class="form-control btn btn-warning mt-2">Add new expense</button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
</template>

<script>
import { mapState } from 'vuex'

// import Swal from 'sweetalert2'

export default {
    name: 'home',
    data(){
      return {
        selectedBudgetId: '',
        budget: 0
      }
    },
    created(){
      const t = this

      t.$store.dispatch('getBudgetExpenses')
    },
    computed:  {
        ...mapState(['budgets']),
    },
    methods: {
      checkData() {
        // const t = this;

        // t.budget = budget
        console.log('test')
      }
    }
}
</script>