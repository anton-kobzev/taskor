'use strict';

module.exports = function(Task) {
    Task.definition.rawProperties.createdAt.default =
        Task.definition.properties.createdAt.default = function() {
            return new Date();
        };

    /**
     * Analyze your productivity
     */
    Task.analyze = function(callback) {
        Task.find({where: {archive: false}}, (err, tasks) => {
            let sumEstimateTime = 0,
                sumActualTime = 0,
                doneTasksCount = 0,
                potentialEstimateTime = 0;
            for (let task of tasks) {
                if (task.done) {
                    sumEstimateTime += task.estimateTime;
                    sumActualTime += task.actualTime;
                    doneTasksCount++;
                } else {
                    potentialEstimateTime += task.estimateTime ? task.estimateTime : task.actualTime * 2;
                }
            }

            sumActualTime = Math.round(sumActualTime * 100) / 100;

            let result = {
                sumEstimateTime: sumEstimateTime,
                potentialEstimateTime: sumEstimateTime + potentialEstimateTime,
                sumActualTime: sumActualTime,
                koeff: (Math.round(sumEstimateTime / sumActualTime * 100) / 100) || 0,
            };

            callback(null, result);
        });
    };
};
