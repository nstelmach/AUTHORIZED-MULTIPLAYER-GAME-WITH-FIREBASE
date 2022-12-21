import classes from "./Layout.module.css";
import Header from "../header/Header";

export type LayoutProps = {
  children: React.ReactNode;
};
function Layout({ children }: LayoutProps) {
  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.contentWrapper}>{children}</div>
    </div>
  );
}

export default Layout;
