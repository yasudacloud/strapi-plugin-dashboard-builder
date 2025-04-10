import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { DashboardWidgetGroup } from '../../types';

interface setMetaFieldArgs {
  uuid: string;
  metaFields: any;
}

interface WidgetConfig {
  height?: string;
  width?: string;
}

const WidgetsContext = createContext<{
  data: DashboardWidgetGroup[];
  setData: Dispatch<SetStateAction<DashboardWidgetGroup[]>>;
  setMetaFields: (args: setMetaFieldArgs) => void;
  findMetaFields: (uuid: string) => any | undefined;
  widgetConfig: WidgetConfig;
  setWidgetConfig: Dispatch<SetStateAction<WidgetConfig>>;
  openNotification: () => void;
  visibleNotification: boolean;
}>({
  data: [],
  setData: () => {},
  setMetaFields: (args: setMetaFieldArgs) => {},
  findMetaFields: (uuid: string) => {},
  widgetConfig: {},
  setWidgetConfig: () => {},
  openNotification: () => {},
  visibleNotification: false,
});

export const WidgetProvider = (props: { children: any }) => {
  const { children } = props;
  const [data, setData] = useState<DashboardWidgetGroup[]>([]);
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>({});
  const [visibleNotification, setVisibleNotification] = useState<boolean>(false);
  const setMetaFields = (args: setMetaFieldArgs) => {
    setData((prevState) => {
      return prevState.map((group) => {
        group.children = group.children.map((widget) => {
          if (widget.uuid === args.uuid) {
            widget.metafields = args.metaFields;
          }
          return widget;
        });
        return group;
      });
    });
  };
  const openNotification = () => {
    setVisibleNotification(true);
    setTimeout(() => {
      setVisibleNotification(false);
    }, 2000);
  };
  const findMetaFields = (uuid: string) => {
    for (let i = 0; i < data.length; i++) {
      const widget = data[i].children.find((widget) => widget.uuid === uuid);
      if (widget) {
        return widget.metafields;
      }
    }
    return undefined;
  };
  return (
    <WidgetsContext.Provider
      value={{
        data,
        setData,
        setMetaFields,
        findMetaFields,
        widgetConfig,
        setWidgetConfig,
        openNotification,
        visibleNotification,
      }}
    >
      {children}
    </WidgetsContext.Provider>
  );
};

export const useWidget = () => {
  const context = useContext(WidgetsContext);
  if (!context) {
    throw new Error('useWidget must be used within a WidgetProvider');
  }
  return context;
};
