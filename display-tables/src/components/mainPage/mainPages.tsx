import { MainPageProvider } from './mainPageContext';
import { Page } from './page';

export const MainPages = () => {
  return (
    <MainPageProvider>
      <Page />
    </MainPageProvider>
  );
};
