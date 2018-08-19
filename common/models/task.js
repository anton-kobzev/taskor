"use strict"

module.exports = function(Task) {
    Task.definition.rawProperties.createdAt.default = Task.definition.properties.createdAt.default = function() {
        return new Date()
    }

    /**
     * Analyze your productivity
     */
    Task.analyze = function(callback) {
        Task.find({ where: { archive: false } }, (err, tasks) => {
            let donePrice = 0,
                doneTime = 0,
                doneTasksCount = 0,
                potentialPrice = 0,
                allTime = 0
            for (let task of tasks) {
                if (task.done) {
                    donePrice += task.price
                    doneTime += task.time
                    doneTasksCount++
                }

                potentialPrice += task.price ? task.price : task.time * 2
                allTime += task.time
            }

            let result = {
                donePrice: roundTwoDigits(donePrice),
                potentialPrice: roundTwoDigits(potentialPrice),
                doneTime: roundTwoDigits(doneTime),
                allTime: roundTwoDigits(allTime),
                koeff: roundTwoDigits(donePrice / doneTime) || 0
            }

            callback(null, result)
        })
    }
}

function roundTwoDigits(num) {
    return Math.round(num * 100) / 100
}
