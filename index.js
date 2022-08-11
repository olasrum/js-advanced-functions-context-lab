/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(rowData) {
    return rowData.map(function(row) {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    })
    return this
}  

let hoursWorkedOnDate = function(dateStamp) {
    let timeIn = this.timeInEvents.find(function(e){
        return e.date === dateStamp
    })
    let timeOut = this.timeOutEvents.find(function(e){
        return e.date === dateStamp
    })
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(dateStamp) {
    let wage = hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour
    return parseFloat(wage.toString())
}
 
let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec) {
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor.call(rec)
    }, 0)
}