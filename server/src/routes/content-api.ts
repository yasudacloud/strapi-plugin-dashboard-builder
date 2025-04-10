export default [
  {
    method: 'GET',
    path: '/widgets',
    handler: 'controller.widgets',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/',
    handler: 'controller.saveWidgets',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/pie_chart_sample',
    handler: 'controller.pieChartSample',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/bar_chart_sample',
    handler: 'controller.barChartSample',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/radar_chart_sample',
    handler: 'controller.radarChartSample',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/line_chart_sample',
    handler: 'controller.lineChartSample',
    config: {
      policies: [],
    },
  },
];
