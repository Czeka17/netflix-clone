import { Fragment } from "react";
import MainNavigation from "./main-navigation";
import { ReactNode } from "react";
type LayoutProps = {
    children: ReactNode;
  };
function Layout(props: LayoutProps) {
	return (
		<Fragment>
			<MainNavigation />
			<main className="min-h-[100vh]">{props.children}</main>
		</Fragment>
	);
}

export default Layout;
