# Chart Setting

Chart data must be referenced in a GET HTTP request.
The format of each data and sample data are as follows.

## Pie Chart

example API endpoint: `/dashboard-builder/pie_chart_sample`

The display name and value are `name` and `value`, respectively.

`value` is a numeric type.

```json
[
  {
    "name": "Dog",
    "value": 150
  },
  {
    "name": "Cat",
    "value": 200
  },
  {
    "name": "Bird",
    "value": 50
  },
  {
    "name": "Horse",
    "value": 100
  },
  {
    "name": "Fish",
    "value": 80
  }
]
```

## Bar Chart

example API endpoint: `/dashboard-builder/bar_chart_sample`

The display name is `name`, and other names are optional and numeric.

```json
[
  {
    "name": "2025/01",
    "productA": 100,
    "productB": 120
  },
  {
    "name": "2025/02",
    "productA": 80,
    "productB": 90
  },
  {
    "name": "2025/03",
    "productA": 150,
    "productB": 120
  },
  {
    "name": "2025/04",
    "productA": 100,
    "productB": 180
  },
  {
    "name": "2025/05",
    "productA": 100,
    "productB": 75
  },
  {
    "name": "2025/06",
    "productA": 130,
    "productB": 80
  }
]
```

## Radar Chart
example API endpoint: `/dashboard-builder/radar_chart_sample`

The display name is `name`, and other names are optional and numeric.

```json
[
  {
    "name": "Math",
    "A": 120,
    "B": 110
  },
  {
    "name": "Chinese",
    "A": 98,
    "B": 130
  },
  {
    "name": "English",
    "A": 86,
    "B": 130
  },
  {
    "name": "Geography",
    "A": 99,
    "B": 100
  },
  {
    "name": "Physics",
    "A": 85,
    "B": 90
  },
  {
    "name": "History",
    "A": 65,
    "B": 85
  }
]
```

## Line Chart
example API endpoint: `/dashboard-builder/line_chart_sample`

The display name is `name`, and other names are optional and numeric.

```json
[
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]
```

### API Example

[Example Code](https://github.com/yasudacloud/strapi-plugin-dashboard-builder/blob/main/server/src/controllers/controller.ts#L14-L161)
