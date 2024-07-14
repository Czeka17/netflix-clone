import { Fragment } from "react";
import MainNavigation from "./main-navigation";
import { ReactNode } from "react";
import { ChildrenProps } from "../../lib/types";

function Layout(props: ChildrenProps) {
	return (
		<Fragment>
			<MainNavigation />
			<main className="min-h-[100vh]">{props.children}</main>
		</Fragment>
	);
}

export default Layout;
