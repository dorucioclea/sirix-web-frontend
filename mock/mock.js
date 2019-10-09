import Mock from 'mockjs'

const Random = Mock.Random

var listData = function (options) {
    let _data = []
    if (options && options.url) {
        var params = options.url.split('?')[1].split('&')

        var obj = {}
        params.forEach(param => {
            var key = param.split('=')[0]
            var value = param.split('=')[1]
            obj[key] = value - 0
        });
        if (obj.total && obj.pageSize) {
            for (let i = 0; i < obj.pageSize; i++) {
                if ((obj.total - (obj.page - 1) * obj.pageSize - i) <= 0)
                    break;
                let newList = {

                    revision: obj.total - (obj.page - 1) * obj.pageSize - i,
                    revisionTimestamp: Random.datetime('yyyy-MM-dd HH:mm:ss.SSZ'),
                    author: Random.name(),
                    commitMessage: Random.sentence()
                }
                _data.push(newList)
            }
        }



    }


    return _data
}
var countData = function () {
    let _data = Random.integer(1, 500)

    return {
        count: _data
    }
}

// this rest api path will mock data
Mock.mock(RegExp('http://localhost:3002/api/history.*'), 'get', listData)
Mock.mock('http://localhost:3002/api/counts', 'get', countData)