import type { Core } from '@strapi/strapi';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  async widgets(ctx: any) {
    const service = strapi.service('plugin::dashboard-builder.service');
    const widgets = await service.widgets();
    ctx.send(JSON.stringify(widgets));
  },
  async saveWidgets(ctx: any) {
    const service = strapi.service('plugin::dashboard-builder.service');
    await service.saveWidget(ctx.request.body);
    ctx.send(JSON.stringify({}));
  },
  pieChartSample(ctx: any) {
    const data = [
      {
        name: 'Dog',
        value: 150,
      },
      {
        name: 'Cat',
        value: 200,
      },
      {
        name: 'Bird',
        value: 50,
      },
      {
        name: 'Horse',
        value: 100,
      },
      {
        name: 'Fish',
        value: 80,
      },
    ];
    ctx.send(JSON.stringify(data));
  },
  barChartSample(ctx: any) {
    const data = [
      {
        name: '2025/01',
        productA: 100,
        productB: 120,
      },
      {
        name: '2025/02',
        productA: 80,
        productB: 90,
      },
      {
        name: '2025/03',
        productA: 150,
        productB: 120,
      },
      {
        name: '2025/04',
        productA: 100,
        productB: 180,
      },
      {
        name: '2025/05',
        productA: 100,
        productB: 75,
      },
      {
        name: '2025/06',
        productA: 130,
        productB: 80,
      },
    ];
    ctx.send(JSON.stringify(data));
  },
  radarChartSample(ctx: any) {
    const data = [
      {
        name: 'Math',
        A: 120,
        B: 110,
      },
      {
        name: 'Chinese',
        A: 98,
        B: 130,
      },
      {
        name: 'English',
        A: 86,
        B: 130,
      },
      {
        name: 'Geography',
        A: 99,
        B: 100,
      },
      {
        name: 'Physics',
        A: 85,
        B: 90,
      },
      {
        name: 'History',
        A: 65,
        B: 85,
      },
    ];
    ctx.send(JSON.stringify(data));
  },
  lineChartSample(ctx: any) {
    const data = [
      {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];
    ctx.send(JSON.stringify(data));
  },
});

export default controller;
