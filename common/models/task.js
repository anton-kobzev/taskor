"use strict";

module.exports = function(Task) {
    Task.definition.rawProperties.createdAt.default = Task.definition.properties.createdAt.default = function() {
        return new Date();
    };

    /**
     * Analyze your productivity
     */
    Task.analyze = function(callback) {
        Task.find({ where: { archive: false } }, (err, tasks) => {
            let sumPrice = 0,
                sumTime = 0,
                doneTasksCount = 0,
                potentialPrice = 0;
            for (let task of tasks) {
                if (task.done) {
                    sumPrice += task.price;
                    sumTime += task.time;
                    doneTasksCount++;
                } else {
                    potentialPrice += task.price
                        ? task.price
                        : task.time * 2;
                }
            }

            sumTime = roundTwoDigits(sumTime);
            sumPrice = roundTwoDigits(sumPrice);

            let result = {
                sumPrice,
                potentialPrice: roundTwoDigits(
                    sumPrice + potentialPrice
                ),
                sumTime,
                koeff: roundTwoDigits(sumPrice / sumTime) || 0
            };

            callback(null, result);
        });
    };
};

function roundTwoDigits(num) {
    return Math.round(num * 100) / 100;
}
