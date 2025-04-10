import type { Core } from '@strapi/strapi';

export interface SaveWidgetParams {
  row_index: number;
  metafields: any;
  widget_type: string;
}

const widgetUid = 'plugin::dashboard-builder.widgets';

const service = ({ strapi }: { strapi: Core.Strapi }) => ({
  async widgets() {
    return await strapi.entityService.findMany(widgetUid, {
      sort: [{
        row_index: 'asc',
      }, {
        id: 'asc'
      }],
    });
  },
  async saveWidget(params: SaveWidgetParams[]) {
    await strapi.db.transaction(async ({ trx, rollback, commit, onCommit, onRollback }) => {
      await strapi.db.query(widgetUid).deleteMany();
      for (let i = 0; i < params.length; i++) {
        await strapi.entityService.create(widgetUid, {
          data: params[i],
        });
      }
    });
  },
});

export default service;
