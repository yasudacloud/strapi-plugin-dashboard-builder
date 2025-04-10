import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  register(app: StrapiApp) {
    const indexRoute = app.router.routes.find((route) => route.index);
    if (indexRoute) {
      indexRoute.lazy = async () => {
        const { Dashboard } = await import('./pages/Dashboard');
        return { Component: Dashboard };
      };
    }
    app.createSettingSection(
      {
        id: 'dashboard-builder',
        intlLabel: { id: 'dashboard-builder.displayName', defaultMessage: 'Dashboard' },
      },
      [
        {
          intlLabel: { id: 'test', defaultMessage: 'Dashboard Builder' },
          id: 'test',
          to: '/dashboard',
          Component: async () => await import('./pages/Setting'),
          permissions: [],
        },
      ]
    );

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
      injectionZones: {
        dashboard: {
          customWidgets: [],
        },
      },
    });
  },
  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          const convertedData: any = {};
          for (const key in data) {
            convertedData[`dashboard-builder.${key}`] = data[key];
          }
          return { data: convertedData, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
