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
            let sumEstimateTime = 0, sumActualTime = 0, done = 0;
            for (let task of tasks) {
                if (task.done) {
                    sumEstimateTime += task.estimateTime;
                    sumActualTime += task.actualTime;
                    done++;
                }
            }

            let result = {
                items: [
                    {
                        title: 'Выполнено',
                        value: done,
                        unit: 'задач',
                        icon: 'fas fa-check',
                    },
                    {
                        title: 'Всего',
                        value: tasks.length,
                        unit: 'задач',
                        icon: 'far fa-sticky-note',
                    },
                    {
                        title: 'Закрыто',
                        value: sumEstimateTime,
                        unit: 'ч',
                        icon: 'fas fa-bolt',
                    },
                    {
                        title: 'Затрачено',
                        value: Math.round(sumActualTime * 100) / 100,
                        unit: 'ч',
                        icon: 'fas fa-clock',
                    },
                ],
            };

            if (sumActualTime == 0)
                result.level = 0;
            else
                result.level = Math.round(sumEstimateTime / sumActualTime * 100) / 100;

            callback(null, result);
        });
    };
};
