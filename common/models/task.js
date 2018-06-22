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

            sumActualTime = Math.round(sumActualTime * 100) / 100;

            let result = {
                items: [
                    {
                        title: 'Выполнено',
                        value: Math.round(done / tasks.length  * 100) || 0,
                        unit: '% задач',
                        icon: 'fas fa-check',
                    },
                    {
                        title: 'Закрыто',
                        value: sumEstimateTime,
                        unit: ' ч',
                        icon: 'fas fa-bolt',
                    },
                    {
                        title: 'Затрачено',
                        value: sumActualTime,
                        unit: ' ч',
                        icon: 'fas fa-clock',
                    },
                    {
                        title: 'Коэффициент',
                        value: sumEstimateTime / sumActualTime || 0,
                        unit: '',
                        icon: 'fas fa-asterisk',
                    },
                ],
            };

            callback(null, result);
        });
    };
};
