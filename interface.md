## API

## Configuration
### Report Init Configuration


- HTTP method: `GET`
- Endpoint: `/api/configuration`
- Content-Type: `application/json`

**JSON content of response**

```json
{
    
    "factory": "",
    "regions": [
        {
          "value": "A",
          "label": "A区",
          "areas": [{
            "value": "A1",
            "label": "A1",
            "subareas": [{
              "value": "A101",
              "label": "A101",
              "isLeaf": true
            }, {
              "value": "A102",
              "label": "A102",
              "isLeaf": true
            }]
          }, {
            "value": "A2",
            "label": "A2",
            "isLeaf": true
          }]
        }
        , {
          "value": "B",
          "label": "B区",
          "areas": [{
            "value": "B1",
            "label": "B1",
            "subAreas": [{
              "value": "B101",
              "label": "B101",
              "isLeaf": true
            }]
          }]
        }
      ]
  }
```

## 页面Dashboard所用数据

### Request

- HTTP method: `POST`
- Endpoint: `/api/overview`
- Content-Type: `application/json`

**JSON content of request**
```json
[
  {     
    "queryId": "xxxxxxx-guid",
    "option": {
      "factory": "",
      "region": "A,A1,A101",
      "system": "All",
      "startTime": "2017-10-01T09:37:50.000Z",    //用户所选当前时间段
      "endTime": "2017-11-01T09:37:50.999Z",
    }
  },
  {
    "queryId": "xxxxxxx-guid",
    "option": {
      "factory": "",
      "region": "A,A1,A101",
      "system": "All",
      "startTime": "2017-9-01T09:37:50.000Z",  //用户所选时间段的上一时段
      "endTime": "2017-10-01T09:37:50.999Z",
    }
  }
]
```

### Response
**JSON content of response**
```json
[
    {
        "queryId": "xxxxxxx-guid",
        "option": {
            "factory": "",
            "region": "A,A1,A101",
            "system": "All",
            "startTime": "2017-10-01T09:37:50.000Z",
            "endTime": "2017-11-01T09:37:50.999Z",
        },
        "values": {
            "area": 3985,
            "totalEnergy" : 7750,
            "totalCost": 5775.55,
            "lightEnergy": 888.8,
            "airConditionEnergy":888.8,
            "liftEnergy": 888.8,
            "peakPeriod": {
              "energy":800,
              "target": 2000   //正常应该由用户设置，不同区域不同时段的target可能会有所不同
            },
            "flatPeriod": {
              "energy":1800,
              "target": 2000
            },
            "valleyPeriod": {
              "energy":1200,
              "target": 2000
            },
            "commercial": {
              "energy":1500,
              "target": 2000
            }
        }
    },
    {
        "queryId": "xxxxxxx-guid",
        "option": {
            "factory": "",
            "region": "A,A1,A101",
            "system": "All",
            "startTime": "2017-9-01T09:37:50.000Z",
            "endTime": "2017-10-01T09:37:50.999Z",
        },
        "values": {
            "area": 3985,
            "totalEnergy" : 7750,
            "totalCost": 5775.55,
            "lightEnergy": 888.8,
            "airConditionEnergy":888.8,
            "liftEnergy": 888.8,
            "peakPeriod": {
              "energy":800,
              "target": 2000
            },
            "flatPeriod": {
              "energy":1800,
              "target": 2000
            },
            "cerealPeriod": {
              "energy":1200,
              "target": 2000
            },
            "commercial": {
              "energy":1500,
              "target": 2000
            }
        }
    }
]
```

## 获取所选区域的timeseries数据

### Request

- HTTP method: `POST`
- Endpoint: `/api/timeseries`
- Content-Type: `application/json`

**JSON content of request**
```json
[
  {
    "queryId": "xxxxxxx-guid",
    "option": {
      "factory": "",
      "region": "A,A1,A101",
      "system": "All",     //系统监测页面分别以“air-condition”、“lift”、“light”为系统，发送三条数据
      "startTime": "2017-10-01T09:37:50.000Z",
      "endTime": "2017-11-01T09:37:50.999Z",
      "interval":"5min"       // 1~6天： 5min；
                              //7~31天：30min，
                              //32~366天：4h
                              // >=1年：1day
    }
  }
]
```

### Response
**JSON content of response**
```json
[
    {
        "queryId": "xxxxxxx-guid",
        "option": {
            "factory": "",
            "region": "A,A1,A101",
            "system": "All",
            "startTime": "2017-10-01T09:37:50.000Z",
            "endTime": "2017-11-01T09:37:50.999Z",
        },
        "values": [ //每5分钟一个数据
          {
            "a_voltage":220,
            "b_voltage":219,
            "c_voltage":221,
            "frequence":50,
            "a_current":0.5,
            "b_current":1,
            "c_current":0,
            "total_power_factor":0.873,
            "a_power_factor":0.563,
            "b_power_factor":0.753,
            "c_power_factor":0.987,
            "total_active_power":1.234,
            "a_active_power":1,
            "b_active_power":0.994,
            "c_active_power":1.005,
            "total_reactive_power":0.314,
            "a_reactive_power":1,
            "b_reactive_power":0.994,
            "c_reactive_power":1.005,
            "recordtime":"2017-10-01T09:42:50.000Z",
          },
          {
           "a_voltage":220,
            "b_voltage":219,
            "c_voltage":221,
            "frequence":50,
            "a_current":0.5,
            "b_current":1,
            "c_current":0,
            "total_power_factor":0.873,
            "a_power_factor":0.563,
            "b_power_factor":0.753,
            "c_power_factor":0.987,
            "total_active_power":1.234,
            "a_active_power":1,
            "b_active_power":0.994,
            "c_active_power":1.005,
            "total_reactive_power":0.314,
            "a_reactive_power":1,
            "b_reactive_power":0.994,
            "c_reactive_power":1.005,
            "recordtime":"2017-10-01T09:42:50.000Z",
          },
          {
           "a_voltage":220,
            "b_voltage":219,
            "c_voltage":221,
            "frequence":50,
            "a_current":0.5,
            "b_current":1,
            "c_current":0,
            "total_power_factor":0.873,
            "a_power_factor":0.563,
            "b_power_factor":0.753,
            "c_power_factor":0.987,
            "total_active_power":1.234,
            "a_active_power":1,
            "b_active_power":0.994,
            "c_active_power":1.005,
            "total_reactive_power":0.314,
            "a_reactive_power":1,
            "b_reactive_power":0.994,
            "c_reactive_power":1.005,
            "recordtime":"2017-10-01T09:42:50.000Z",
          }
        ]
    },
]
```


## 获取所选区域所有子区域的能耗数据

### Request

- HTTP method: `POST`
- Endpoint: `/api/hierarchy`
- Content-Type: `application/json`

**JSON content of request**
```json
[
  {
    "queryId": "xxxxxxx-guid",
    "option": {
      "factory": "",
      "region": "All",
      "system": "All",     //系统监测页面分别以“air-condition”、“lift”、“light”为系统，发送三条数据
      "startTime": "2017-10-01T09:37:50.000Z",
      "endTime": "2017-11-01T09:37:50.999Z",
    }
  }
]
```

### Response
**JSON content of response**
```json
[
    {
        "queryId": "xxxxxxx-guid",
        "option": {
            "factory": "",
            "region": "All",
            "system": "All",
            "startTime": "2017-10-01T09:37:50.000Z",
            "endTime": "2017-11-01T09:37:50.999Z",
        },
        "values": [
          {
          "value": "A",
          "label": "A区",
          "energy": 888.8,
          "areas": [{
            "value": "A1",
            "label": "A1",
            "energy": 888.8,
            "subareas": [{
              "value": "A101",
              "label": "A101",
              "energy": 888.8,
              "isLeaf": true
            }, {
              "value": "A102",
              "label": "A102",
              "energy": 888.8,
              "isLeaf": true
            }]
          }, {
            "value": "A2",
            "label": "A2",
            "energy": 888.8,
            "isLeaf": true
          }]
        }
        , {
          "value": "B",
          "label": "B区",
          "energy": 888.8,
          "areas": [{
            "value": "B1",
            "label": "B1",
            "energy": 888.8,
            "subareas": [{
              "value": "B101",
              "label": "B101",
              "energy": 888.8,
              "isLeaf": true,
            }]
          }]
        }
        ]
    }
]
```
