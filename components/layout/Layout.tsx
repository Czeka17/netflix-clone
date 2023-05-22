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
			<main>{props.children}</main>
		</Fragment>
	);
}

export default Layout;
