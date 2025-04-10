import { WidgetProvider } from '../Setting/provider';
import DashboardView from './DashboardView';

export const Dashboard = () => {
  return (
    <>
      <WidgetProvider>
        <DashboardView />
      </WidgetProvider>
    </>
  );
};
