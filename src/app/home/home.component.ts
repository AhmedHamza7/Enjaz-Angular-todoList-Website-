import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {allGoals} from '../goals'
import {goalTasks} from '../goals'

import {percentages} from '../goals'
// import {allTasks} from '../goals'
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  constructor() { }
  // goal = document.getElementById('goal') as HTMLInputElement
  fromDate = document.getElementById('fromDate') as HTMLInputElement
  toDate = document.getElementById('toDate') as HTMLInputElement




  
  allGoals:allGoals[] = []
  oncetasks:goalTasks[] = []
  onlyTasks:any[] = []
  everyTasksGoal: any[][] = []
  everyPercentage: percentages[] = []
  lengths:any= ''
  minus:any[] = []
  percentage:any[] = []
  tasksLength:any[] = []
  colorInput:any 


  minusBeforeDelete: any [] = []
  LengthsBeforeDelete:any [] = []
  FixedLengths:any[] = []
  FixedMinus:any [] = []




  goalDetails = new FormGroup({
    goalName: new FormControl('', [Validators.required]),
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
    
  })

  taskDetails = new FormGroup({
    task: new FormControl("", [Validators.required]),
    goalsList: new FormControl("", [Validators.required]),

  })

  // H   A   B   I   T    FUNCTIONS




  // G   O   A   L  S    FUNCTIONS

  target(e:any){
    let color1:any = e.target
    color1.classList.add('active')
        $(color1).siblings().removeClass('active')
    let myDivObjBgColor = window.getComputedStyle(color1, null).backgroundColor;
    this.colorInput = myDivObjBgColor
  }
   
addGoal(){
  let goal = document.getElementById('goal') as HTMLInputElement
  let fromDate = document.getElementById('fromDate') as HTMLInputElement
  let toDate = document.getElementById('toDate') as HTMLInputElement
  let taskInput = document.getElementById("taskInput") as HTMLInputElement

  
  let goalValue = goal.value
  let fromDateValue = fromDate.value
  let toDateValue = toDate.value
  let colorValue = this.colorInput

  this.allGoals.push({
    goal: goalValue,
    fromDate: fromDateValue,
    toDate:toDateValue,
    color:colorValue,
    
  })
  localStorage.setItem('goals',JSON.stringify(this.allGoals) )

    this.oncetasks = JSON.parse(localStorage.getItem('goals') || '')
    this.everyTasksGoal[this.oncetasks.length - 1] = new Array()
    this.oncetasks[this.oncetasks.length - 1].tasks = new Array()
    this.percentage[this.oncetasks.length - 1] = new Array()
    this.minus= new Array(this.allGoals.length).fill(0)
    this.FixedLengths= new Array(this.allGoals.length).fill(0)
    this.FixedMinus = new Array(this.allGoals.length).fill(0)

    localStorage.setItem('percentages',  JSON.stringify(this.percentage))
    localStorage.setItem('goalTasks', JSON.stringify(this.everyTasksGoal))
    
  this.hide()
  goal.value = ''
  fromDate.value = ''
  fromDate.value = ''
}

deleteItem(indexItem:any) {
  this.allGoals.splice(indexItem, 1)
  this.everyTasksGoal.splice(indexItem, 1)
  this.everyPercentage.splice(indexItem, 1)
  this.minus.splice(indexItem, 1)
  this.LengthsBeforeDelete.splice(indexItem, 1)
  // this.lengths = this.LengthsBeforeDelete[indexItem] 


  localStorage.setItem('goals',JSON.stringify(this.allGoals) )
  localStorage.setItem('goalTasks', JSON.stringify(this.everyTasksGoal))
  localStorage.setItem('percentagesDetails',  JSON.stringify(this.everyPercentage))


}
display() {
  let addGoal:any = document.getElementsByClassName('addGoal')[0]
  addGoal.classList.replace('d-none','d-flex')
}
hide(){
  let addGoal:any = document.getElementsByClassName('addGoal')[0]
  addGoal.classList.replace('d-flex','d-none')
}
  // G   O   A   L - T  A  S  K  S    FUNCTIONS

addTask(i:any) {
  let taskInput = document.getElementsByClassName("taskInputinner") as HTMLCollectionOf<HTMLInputElement>
  
    if(taskInput[i].value != ''){
      this.everyTasksGoal[i].push(taskInput[i].value)
      this.FixedLengths[i]++
      this.lengths = this.FixedLengths[i]
    }

    this.percentage[i] = (this.minus[i] / this.lengths) * 100
      
    for (let x=0; x < this.allGoals.length;x++){
      let taskDone = document.getElementById('taskDone')

      if (this.percentage[i] == 100) {
        const diplayCelebrate = setTimeout(() => {
          taskDone?.classList.replace('d-none','d-flex')
        }, 0);
      }
    }
      this.everyPercentage[i] = {
        minus: this.minus[i],
        lengths: this.lengths,
        percentage: this.percentage[i]
      }


      this.minusBeforeDelete[i] = this.minus[i]
      this.LengthsBeforeDelete[i] = this.lengths


    localStorage.setItem('percentages',  JSON.stringify(this.percentage))
    localStorage.setItem('lengthsOfTasks', JSON.stringify(this.LengthsBeforeDelete))
    localStorage.setItem('lengths', JSON.stringify(this.lengths))
    localStorage.setItem('goalTasks',JSON.stringify(this.everyTasksGoal))
    
  this.resetTasks(i)
}

  todayTasks: string[] = []
  todayAdd(event:any, i:any, e:any){
    let target = event.target
    let arrow = document.getElementsByClassName('arrow')
    let textTask = $(target).parent().prev().children().text()

    if(textTask != '') {
      // this.lengths = this.everyTasksGoal[i].length
      this.lengths = this.LengthsBeforeDelete[i] 

      this.minus[i]++
    this.todayTasks.push(textTask)
    this.percentage[i] = (this.minus[i] / this.lengths) * 100
      
    for (let x=0; x < this.allGoals.length;x++){
      let taskDone = document.getElementById('taskDone')

      if (this.percentage[i] == 100) {
        const diplayCelebrate = setTimeout(() => {
          taskDone?.classList.replace('d-none','d-flex')
        }, 0);
      }
    }

    console.log(this.minus);
    
    console.log(this.lengths);
    
      this.everyPercentage[i] = {
        minus: this.minus[i],
        lengths: this.lengths,
        percentage: this.percentage[i]
      }

      this.minusBeforeDelete[i] = this.minus[i]
      this.LengthsBeforeDelete[i] = this.lengths
      this.everyTasksGoal[i].splice(e, 1)
      localStorage.setItem('goalTasks', JSON.stringify(this.everyTasksGoal))

    
    }

    localStorage.setItem('percentages',  JSON.stringify(this.percentage))
    localStorage.setItem('percentagesDetails',  JSON.stringify(this.everyPercentage))
    localStorage.setItem('todayTasks', JSON.stringify(this.todayTasks))
  }

  deleteGoalTask(i:any, e:any){
    this.lengths = this.LengthsBeforeDelete[i] 

    this.everyTasksGoal[i].splice(e, 1)
    this.minusBeforeDelete[i]++
    this.minus[i] = this.minusBeforeDelete[i]

    this.percentage[i] = (this.minus[i] / this.lengths) * 100
      
    for (let x=0; x < this.allGoals.length;x++){
      let taskDone = document.getElementById('taskDone')

      if (this.percentage[i] == 100) {
        const diplayCelebrate = setTimeout(() => {
          taskDone?.classList.replace('d-none','d-flex')
        }, 0);
      }
    }
    console.log(this.minus);
    
    console.log(this.lengths);
      this.everyPercentage[i] = {
        minus: this.minus[i],
        lengths: this.lengths,
        percentage: this.percentage[i]
      }

 

    localStorage.setItem('percentages',  JSON.stringify(this.percentage))
    localStorage.setItem('goalTasks', JSON.stringify(this.everyTasksGoal))

  }

  // T  O  D  A  Y - T  A  S  K  S    FUNCTIONS

  addTodayTask(){
    let inputToday = document.getElementById('inputToday') as HTMLInputElement

    if (inputToday.value != '') {
      this.todayTasks.push(inputToday.value)
      localStorage.setItem('todayTasks', JSON.stringify(this.todayTasks))
    }
    

    inputToday.value = ''

  }
  deleteTodayTask(i:any){
    this.todayTasks.splice(i, 1)

    localStorage.setItem('todayTasks', JSON.stringify(this.todayTasks))
  }
taskDone(i:any) {
    let checkBox = document.getElementsByClassName('checkBox') as HTMLCollectionOf<HTMLInputElement>
    let taskDone = document.getElementById('taskDone')
    if (checkBox[i].checked == true) {
      $(checkBox[i]).next().css('text-decoration', 'line-through') 
    } else {
      $(checkBox[i]).next().css('text-decoration', 'none') 
    }
    
  }

  resetTasks(i:any){
    let taskInput = document.getElementsByClassName("taskInputinner") as HTMLCollectionOf<HTMLInputElement>
    taskInput[i].value = ''
  }


  // C  E  L  E  B  R  A  T  E    FUNCTIONS




hideGoalDone(i:any){
      this.percentage.splice(i, 1)
      localStorage.setItem('percentages',  JSON.stringify(this.percentage))
    }




  selectedValue = null;
  ngOnInit(): void {


    if(localStorage.getItem('goals') != null) {
      this.allGoals = JSON.parse(localStorage?.getItem('goals') || '')
      this.oncetasks = JSON.parse(localStorage.getItem('goals') || '')
    this.minus= new Array(this.allGoals.length).fill(0)

    } else {
      this.allGoals = []
    }

      if (localStorage.getItem('goalTasks') != null) {
        this.everyTasksGoal = JSON.parse(localStorage?.getItem('goalTasks') || '')
    } 

    if (localStorage.getItem('todayTasks') != null) {
      this.todayTasks = JSON.parse(localStorage.getItem('todayTasks') ||'')
    }

    if (localStorage.getItem('percentagesDetails') != null) {
      this.everyPercentage = JSON.parse(localStorage.getItem('percentagesDetails') ||'')
    }

    
    if (localStorage.getItem('percentages') != null) {
      this.percentage = JSON.parse(localStorage.getItem('percentages') ||'')
    }


    if (localStorage.getItem('lengthsOfTasks') != null) {
      this.LengthsBeforeDelete = JSON.parse(localStorage.getItem('lengthsOfTasks') || '')
    } 
      
    if (localStorage.getItem('percentages') != null) {
      this.percentage = JSON.parse(localStorage.getItem('percentages') ||'')
    }
    
  }
}
