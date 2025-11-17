let totalBudgetShow = document.getElementById("totalBudgetShow");
let totalExpenseShow = document.getElementById("totalExpenseShow");
let remainingBalanceShow = document.getElementById("remainingBalanceShow");

let budgetInput = document.getElementById("budgetInput");
let user_budget_enter;
let expenseAmountInput = document.getElementById("expenseAmountInput");
let user_expense_enter;
let expenseCategoryInput = document.getElementById("expenseCategoryInput");
let expenseDateInput = document.getElementById("expenseDateInput");





let budget_show_value = Number(localStorage.getItem("my_budget")) || 0;
let expense_show_value=Number(localStorage.getItem("expense_value")) || 0
let remaining_show_value=budget_show_value-expense_show_value




let listing_array =   JSON.parse(localStorage.getItem("my_expense")) || []
console.log(listing_array);



function my_listing_funtion(a,index_num){



  if (a) {
    let my_ul=document.getElementById("my_ul")
let my_li=document.createElement("li")
let my_div =document.createElement("div")
my_div.setAttribute('class',"expense-item")
let catetgory=document.createElement("span")
catetgory.innerText=a.expenseCategoryInput
let amount=document.createElement("span")
amount.innerText=a.user_expense_enter
let date=document.createElement("span")
date.innerText=a.expenseDateInput
let edit_btn=document.createElement("span")
edit_btn.innerHTML=`<i class="fa-solid fa-pen"></i>`
edit_btn.setAttribute("onclick",`my_edit_func(${index_num})`)

let del_btn=document.createElement("span")
del_btn.setAttribute("onclick",`my_del_func(${index_num})`)
del_btn.innerHTML=`<i class="fa-solid fa-trash"></i>`



my_div.appendChild(catetgory)
my_div.appendChild(amount)
my_div.appendChild(date)
my_div.appendChild(edit_btn)
my_div.appendChild(del_btn)



my_li.appendChild(my_div)

my_ul.appendChild(my_li)
  }



}

// listing_array.forEach(my_listing_funtion)

function show_values() {
  budget_show_value = Number(localStorage.getItem("my_budget")) || 0;
  expense_show_value=Number(localStorage.getItem("expense_value")) || 0
  remaining_show_value=budget_show_value-expense_show_value
  remainingBalanceShow.innerText=remaining_show_value
  totalBudgetShow.innerText = budget_show_value;
  totalExpenseShow.innerText=expense_show_value
let my_ul=document.getElementById("my_ul")
my_ul.innerHTML=''
listing_array.forEach(my_listing_funtion)

}

show_values();

function set_Budget_func() {
    if (budgetInput.value.length>0) {
      user_budget_enter = Number(budgetInput.value);
    localStorage.setItem("my_budget", budget_show_value + user_budget_enter);
  show_values();
  budgetInput.value=''
  }else{

      Swal.fire({
  title: "Enter Something!",
  icon: "error",
  draggable: true
});
  }
  
}

function set_Expense_func() {
  if (expenseAmountInput.value &&  expenseCategoryInput.value && expenseDateInput.value ) {
    user_expense_enter = Number(expenseAmountInput.value);

  let my_object = {
    user_expense_enter,
    expenseCategoryInput: expenseCategoryInput.value,
    expenseDateInput: expenseDateInput.value,
  };
   listing_array.push(my_object)
   let calculate_expense=0
   console.log(listing_array);
   
   if (listing_array.length>0) {
    listing_array.forEach((a)=>{
    calculate_expense+=a.user_expense_enter

})
   }
   if (budget_show_value<calculate_expense) {
 Swal.fire({
  icon: "error",
  title: "out of Budget",
});
}


  localStorage.setItem("my_expense",JSON.stringify(listing_array))
  localStorage.setItem("expense_value",calculate_expense)


show_values();
expenseAmountInput.value=''
   expenseCategoryInput.value=''
   expenseDateInput.value=''
  }
  else{
    Swal.fire({
  title: "Enter Something!",
  icon: "error",
  draggable: true
});
  }
  

}






function my_del_func(index_num) {
  
  
  listing_array.splice(index_num,1)


  let calculate_expense=0
   
   if (listing_array.length>0) {
    listing_array.forEach((a)=>{
    calculate_expense+=  a.user_expense_enter
})
   }
   

  localStorage.setItem("my_expense",JSON.stringify(listing_array))
  localStorage.setItem("expense_value",calculate_expense)
  Swal.fire({
  position: "center",
  icon: "success",
  title: "Successfully Deleted",
  showConfirmButton: false,
  timer: 1500
});
show_values()
}



function my_edit_func(index_num) {

let clicked_item=listing_array[index_num]
console.log(clicked_item);

  document.getElementById("editModal").style.display="flex"
  document.getElementById("editAmount").value=clicked_item.user_expense_enter
  document.getElementById("editCategory").value=clicked_item.expenseCategoryInput
  document.getElementById("editDate").value=clicked_item.expenseDateInput
let my_save_btn=document.getElementById("save_update_value")
  my_save_btn.setAttribute("onclick",`save_updated_value(${index_num})`)

  
}




function closeModal() {
  document.getElementById("editModal").style.display="none"

  
}


function save_updated_value(index_num) {

  
 let updated_amount= document.getElementById("editAmount").value
 let converting=Number(updated_amount)
  let updated_category=document.getElementById("editCategory").value
  let updated_date=document.getElementById("editDate").value

  listing_array[index_num]={
    user_expense_enter:converting,
    expenseCategoryInput:updated_category,
    expenseDateInput:updated_date
  }

  let calculate_expense=0
   console.log(listing_array);
   
   if (listing_array.length>0) {
    listing_array.forEach((a)=>{
    calculate_expense+=a.user_expense_enter

})
   }


  localStorage.setItem("my_expense",JSON.stringify(listing_array))
  localStorage.setItem("expense_value",calculate_expense)
  closeModal()
  
  Swal.fire({
  position: "center",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
});
  show_values();
  
  
}




