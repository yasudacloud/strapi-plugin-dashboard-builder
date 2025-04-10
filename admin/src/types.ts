export interface DashboardWidgetGroup {
  children: DashboardWidget[];
}

export interface DashboardWidget {
  uuid: string;
  widget_type: WidgetType;
  metafields: any;
  row_index: number;
}

export enum WidgetType {
  singleType = '1',
  collectionType = '2',
  uploadFile = '3',
  pieChart = '4',
  lastEdited = '5',
  lastPublished = '6',
  customWidget = '7',
  barChart = '8',
  radarChart = '9',
  lineChart = '10',
  unknown = '0',
}

export type WidgetProps = {
  isPreview: boolean;
} & DashboardWidget;

interface ChartMetaFields {
  endpoint: string;
}

export interface PieChartMetaFields extends ChartMetaFields {}

export interface BarChartMetaFields extends ChartMetaFields {}

export interface RadarChartMetaFields extends ChartMetaFields {}

export interface LineChartMetaFields extends ChartMetaFields {}

export interface SingleTypeMetaFields {
  singleType: string;
  fields: string[];
}

export interface CollectionTypeMetaFields {
  collectionType: string;
  fields: string[];
  sortKey: string;
  sortAction: string;
}

export interface UploadFileMetaFields {
  sortKey: string;
  sortAction: string;
}

export interface CustomMetaFields {
  name: string;
}
